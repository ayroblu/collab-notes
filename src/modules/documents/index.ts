import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import { nonNullable, sortBy, uuidv4 } from "../utils";

import type { CommentData, FileMetaData, ThreadData, YRoom } from "./types";

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
  const files = ydoc.getArray<Y.Map<any>>("files");
  const name = ydoc.getText("name");
  const initialDbPromise = new Promise<void>((resolve) =>
    persistence.once("synced", () => resolve())
  );
  const initialConnectionPromise = new Promise<void>((resolve) =>
    provider.awareness.once("synced", () => resolve())
  );

  rooms[roomId] = {
    provider,
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
  fileName: string
): FileMetaData | void {
  const { files } = getRoom(roomId, roomPassword);
  return files
    .map((file) => getYFileMetaData(file))
    .filter(nonNullable)
    .find(({ name }) => name === fileName);
}

export function getAllFilesMetaData(
  roomId: string,
  roomPassword: string
): FileMetaData[] {
  const { files } = getRoom(roomId, roomPassword);
  return files.map((file) => getYFileMetaData(file)).filter(nonNullable);
}

export function getFileFromFileName(
  roomId: string,
  roomPassword: string,
  fileName: string
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
  fileName: string
): number | void {
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

export function createNewFile(
  roomId: string,
  roomPassword: string,
  fileName: string
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
  if (!file) return;
  return getYFileText(file);
}

export function getComments(
  roomId: string,
  roomPassword: string,
  fileName: string
): Y.Array<CommentData> | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  if (!file) return;
  return getYFileComments(file);
}

export function getThreads(
  roomId: string,
  roomPassword: string,
  fileName: string
): Y.Map<Y.Array<ThreadData>> | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  if (!file) return;
  return getYFileThreads(file);
}

export function getThread(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string
): Y.Array<ThreadData> | void {
  const threads = getThreads(roomId, roomPassword, fileName);
  if (!threads) return;
  if (!threads.has(commentId)) {
    threads.set(commentId, new Y.Array<ThreadData>());
  }
  return threads.get(commentId)!;
}

type ThreadParams = {
  roomId: string;
  roomPassword: string;
  fileName: string;
  commentId: string;
};
type AddThreadParams = ThreadParams & {
  text: string;
  byId: string;
  byName: string;
};
export function addThread({
  byId,
  byName,
  commentId,
  fileName,
  roomId,
  roomPassword,
  text,
}: AddThreadParams): boolean {
  const thread = getThread(roomId, roomPassword, fileName, commentId);
  if (text && thread) {
    const now = new Date().toISOString();
    thread.push([
      {
        id: uuidv4(),
        commentId,
        text,
        byId,
        byName,
        dateCreated: now,
        dateUpdated: now,
      },
    ]);
    return true;
  }
  return false;
}

type RemoveThreadParams = ThreadParams & {
  threadId: string;
};
export function removeThread({
  commentId,
  fileName,
  roomId,
  roomPassword,
  threadId,
}: RemoveThreadParams): boolean {
  const thread = getThread(roomId, roomPassword, fileName, commentId);
  if (thread) {
    const index = thread.map(({ id }) => id).findIndex((id) => id === threadId);
    if (index !== -1) {
      thread.delete(index, 1);
    }
    return true;
  }
  return false;
}

export const syncCommentNamesFn = (
  roomId: string,
  roomPassword: string,
  fileName: string
) => {
  const { ydoc } = getRoom(roomId, roomPassword);
  const comments = getComments(roomId, roomPassword, fileName);

  return (id: string, name: string) => {
    if (!comments) return;
    const toChange: number[] = [];
    comments.forEach(({ byId, byName }, i) => {
      if (id === byId && byName !== name) {
        toChange.push(i);
      }
    });
    ydoc.transact(() => {
      toChange.forEach((i) => {
        const comment = comments.get(i);
        comments.delete(i);
        comments.insert(i, [{ ...comment, byName: name }]);
      });
    });
  };
};

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
        sortBy([({ length }) => length], ["desc"])
      );
      indexesToDelete.push(...sortedEntries.slice(1).map(({ index }) => index));
    }
  });
  indexesToDelete.sort(sortBy([(a) => a], ["desc"])).forEach((index) => {
    files.delete(index, 1);
  });
}
