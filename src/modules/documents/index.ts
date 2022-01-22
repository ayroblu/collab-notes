import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import { nonNullable } from "../utils";

import type { CommentData, FileMetaData, YFile, YRoom } from "./types";

export * from "./types";

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
  const persistence = new IndexeddbPersistence(roomId, ydoc);
  const files = ydoc.getArray<YFile>("files");
  const name = ydoc.getText("name");
  const initialDbPromise = new Promise<void>((resolve) =>
    persistence.once("synced", () => resolve())
  );

  rooms[roomId] = { provider, ydoc, files, name, initialDbPromise };
  return rooms[roomId]!;
}

export function getFileMetaData(
  roomId: string,
  roomPassword: string,
  fileName: string
): FileMetaData | void {
  const { files } = getRoom(roomId, roomPassword);
  return files
    .map(({ metadata }) => metadata.get("metadata"))
    .filter(nonNullable)
    .find(({ name }) => name === fileName);
}

export function getFileFromFileName(
  roomId: string,
  roomPassword: string,
  fileName: string
): YFile {
  const { files } = getRoom(roomId, roomPassword);
  const index = files
    .map(({ metadata }) => metadata.get("metadata"))
    .filter(nonNullable)
    .findIndex(({ name }) => name === fileName);
  return files.get(index);
}
export function getFileIndexFromFileName(
  roomId: string,
  roomPassword: string,
  fileName: string
): number | void {
  const { files } = getRoom(roomId, roomPassword);
  return files
    .map(({ metadata }) => metadata.get("metadata"))
    .filter(nonNullable)
    .findIndex(({ name }) => name === fileName);
}

export function deleteFile(
  roomId: string,
  roomPassword: string,
  fileName: string
): number | void {
  const { files } = getRoom(roomId, roomPassword);
  const index = getFileIndexFromFileName(roomId, roomPassword, fileName);

  if (typeof index === "number") files.delete(index, 1);
  return index;
}

export function getDocument(
  roomId: string,
  roomPassword: string,
  fileName: string
): Y.Text | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  return file?.text;
}

export function getComments(
  roomId: string,
  roomPassword: string,
  fileName: string
): Y.Array<CommentData> {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  return file?.comments;
}

export function deduplicateFiles(files: Y.Array<FileMetaData>) {
  const seenSet = new Set();
  for (let i = 0; i < files.length; ++i) {
    const { name } = files.get(i);
    if (seenSet.has(name) || !name) {
      files.delete(i, 1);
      --i;
      continue;
    }
    seenSet.add(name);
  }
}
