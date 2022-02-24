import { diffChars } from "diff";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

import { nonNullable, sortBy } from "../utils";

import type { CommentData, FileMetaData, ThreadData, YRoom } from "./types";

export * from "./types";
export * from "./comments";
export * from "./threads";

// Singleton caching
const rooms: { [roomId: string]: YRoom } = {};

export function getRoom(roomId: string, password: string): YRoom {
  const myRoom = rooms[roomId];
  if (myRoom) {
    return myRoom;
  }
  const ydoc = new Y.Doc();
  // @ts-expect-error - types are wrong
  const provider = new WebrtcProvider(roomId, ydoc, { password });
  // Use yjs demos for now, but should switch to our own host solution
  const socketProvider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    roomId,
    ydoc,
  );

  const persistence = new IndexeddbPersistence(roomId, ydoc);
  const files = ydoc.getArray<Y.Map<any>>("files");
  const name = ydoc.getText("name");
  const initialDbPromise = new Promise<void>((resolve) =>
    persistence.once("synced", () => resolve()),
  );
  const initialConnectionPromise = new Promise<void>((resolve) =>
    provider.awareness.once("synced", () => resolve()),
  );

  rooms[roomId] = {
    provider,
    socketProvider,
    ydoc,
    files,
    name,
    initialDbPromise,
    initialConnectionPromise,
  };
  return rooms[roomId]!;
}

export function getFileMetaData(
  roomId: string,
  roomPassword: string,
  fileName: string,
): FileMetaData | void {
  const { files } = getRoom(roomId, roomPassword);
  return files
    .map((file) => getYFileMetaData(file))
    .filter(nonNullable)
    .find(({ name }) => name === fileName);
}

export function getAllFilesMetaData(
  roomId: string,
  roomPassword: string,
): FileMetaData[] {
  const { files } = getRoom(roomId, roomPassword);
  return files.map((file) => getYFileMetaData(file)).filter(nonNullable);
}

export function getFileFromFileName(
  roomId: string,
  roomPassword: string,
  fileName: string,
): Y.Map<any> | undefined {
  const { files } = getRoom(roomId, roomPassword);
  const index = files
    .map((file) => getYFileMetaData(file))
    .filter(nonNullable)
    .findIndex(({ name }) => name === fileName);
  return files.get(index);
}
export function getFileIndexFromFileName(
  roomId: string,
  roomPassword: string,
  fileName: string,
): number {
  const { files } = getRoom(roomId, roomPassword);
  return files
    .map((file) => getYFileMetaData(file))
    .filter(nonNullable)
    .findIndex(({ name }) => name === fileName);
}
export function getYFileMetaData(file: Y.Map<any>): FileMetaData {
  return file.get("metadata");
}
export function getYFileComments(file: Y.Map<any>): Y.Array<CommentData> {
  return file.get("comments");
}
export function getYFileText(file: Y.Map<any>): Y.Text {
  return file.get("text");
}
export function getYFileThreads(file: Y.Map<any>): Y.Map<Y.Array<ThreadData>> {
  const threads = file.get("threads");
  if (!threads) {
    file.set("threads", new Y.Map<Y.Array<ThreadData>>());
  }
  return file.get("threads");
}
export function applyDiff(
  roomId: string,
  roomPassword: string,
  fileName: string,
  getNewString: (text: string) => string,
) {
  const doc = getDocument(roomId, roomPassword, fileName);
  if (!doc) return;
  const text = doc.toString();
  const formatted = getNewString(text);
  const diff = diffChars(text, formatted);
  // console.log("apply diff", text, formatted, diff);
  let index = 0;
  diff.forEach(({ added, count, removed, value }) => {
    if (added) {
      doc.insert(index, value);
    } else if (removed) {
      // Something uses crlf, which breaks if you only try to delete one half as if deletes the whold character
      if (value !== "\r") {
        doc.delete(index, count!);
        return;
      }
    }
    if (count) index += count;
  });
}

export function createNewFile(
  roomId: string,
  roomPassword: string,
  fileName: string,
): Y.Map<any> {
  const { files } = getRoom(roomId, roomPassword);
  const now = new Date().toISOString();

  const file = new Y.Map();
  file.set("metadata", {
    name: fileName,
    tags: [],
    lastUpdated: now,
    dateCreated: now,
  });
  file.set("comments", new Y.Array<CommentData>());
  file.set("text", new Y.Text());
  file.set("threads", new Y.Map<Y.Array<ThreadData>>());
  files.push([file]);
  return getFileFromFileName(roomId, roomPassword, fileName)!;
}
export function deleteFile(
  roomId: string,
  roomPassword: string,
  fileName: string,
): number {
  const { files } = getRoom(roomId, roomPassword);
  const index = getFileIndexFromFileName(roomId, roomPassword, fileName);

  if (index !== -1) files.delete(index, 1);
  return index;
}
export function deleteFileAndGetNextName(
  roomId: string,
  roomPassword: string,
  fileName: string,
): string | void {
  const index = deleteFile(roomId, roomPassword, fileName);
  const { files } = getRoom(roomId, roomPassword);

  const newIndex = index >= files.length ? files.length - 1 : index;
  if (newIndex === -1) return;
  const { name } = getYFileMetaData(files.get(newIndex));
  return name;
}

export function getDocument(
  roomId: string,
  roomPassword: string,
  fileName: string,
): Y.Text | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  if (!file) return;
  return getYFileText(file);
}

export function deduplicateFiles(files: Y.Array<Y.Map<any>>) {
  const seenMap: { [fileName: string]: { index: number; length: number }[] } =
    {};
  files.forEach((file, index) => {
    const { name } = getYFileMetaData(file);
    const arr = seenMap[name];
    const data = { index, length: getYFileText(file).length };
    if (arr) {
      arr.push(data);
    } else {
      seenMap[name] = [data];
    }
  });
  const indexesToDelete: number[] = [];
  Object.entries(seenMap).forEach(([, entries]) => {
    if (entries.length > 1) {
      const sortedEntries = entries.sort(
        sortBy([({ length }) => length], ["desc"]),
      );
      indexesToDelete.push(...sortedEntries.slice(1).map(({ index }) => index));
    }
  });
  indexesToDelete.sort(sortBy([(a) => a], ["desc"])).forEach((index) => {
    files.delete(index, 1);
  });
}
