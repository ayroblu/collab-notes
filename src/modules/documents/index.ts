import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

import type { CommentData, FileMetaData, YFile, YRoom } from "./types";

export * from "./types";

// Singleton caching
const rooms: { [roomId: string]: YRoom } = {};
const roomDocs: { [roomId: string]: { [name: string]: Y.Text } } = {};
const roomComments: {
  [roomId: string]: { [commentId: string]: Y.Array<CommentData> };
} = {};

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

export function getDocument(
  roomId: string,
  ydoc: Y.Doc,
  fileName: string
): Y.Text {
  const textDoc = roomDocs[roomId]?.[fileName];
  if (textDoc) {
    return textDoc;
  }
  const text = ydoc.getText(fileName);
  if (!roomDocs[roomId]) {
    roomDocs[roomId] = {};
  }
  roomDocs[roomId]![fileName] = text;
  return text;
}

export function getComments(
  roomId: string,
  ydoc: Y.Doc,
  fileName: string
): Y.Array<CommentData> {
  const cachedComments = roomComments[roomId]?.[fileName];
  if (cachedComments) {
    return cachedComments;
  }
  const comments = ydoc.getArray<CommentData>(fileName);
  if (!roomComments[roomId]) {
    roomComments[roomId] = {};
  }
  roomComments[roomId]![fileName] = comments;
  return comments;
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
