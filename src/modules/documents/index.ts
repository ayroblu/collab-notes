import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

// type Document = {
//   provider: WebrtcProvider;
//   type: Y.Text;
// };
// const docs: { [key: string]: Document } = {};

type Room = {
  provider: WebrtcProvider;
  ydoc: Y.Doc;
  files: Y.Array<File>;
  name: Y.Text;
  initialDbPromise: Promise<void>;
};
type File = {
  name: string;
  tags: string[];
};
const rooms: { [roomId: string]: Room } = {};
const roomDocs: { [roomId: string]: { [name: string]: Y.Text } } = {};

export function getRoom(roomId: string, password: string): Room {
  const myRoom = rooms[roomId];
  if (myRoom) {
    return myRoom;
  }
  const ydoc = new Y.Doc();
  // @ts-expect-error - types are wrong
  const provider = new WebrtcProvider(roomId, ydoc, { password });
  const persistence = new IndexeddbPersistence(roomId, ydoc);
  const files = ydoc.getArray<File>(roomId);
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
  fileId: string
): Y.Text {
  const textDoc = roomDocs[roomId]?.[fileId];
  if (textDoc) {
    return textDoc;
  }
  const text = ydoc.getText(fileId);
  if (!roomDocs[roomId]) {
    roomDocs[roomId] = {};
  }
  roomDocs[roomId]![fileId] = text;
  return text;
}

export function deduplicateFiles(files: Y.Array<File>) {
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
