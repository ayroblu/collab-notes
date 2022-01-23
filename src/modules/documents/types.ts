import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

export type YRoom = {
  provider: WebrtcProvider;
  ydoc: Y.Doc;
  files: Y.Array<Y.Map<any>>;
  name: Y.Text;
  initialDbPromise: Promise<void>;
};
export type FileMetaData = {
  name: string;
  tags: string[];
  lastUpdated: string;
  dateCreated: string;
};
export type CommentData = {
  id: string; // uuid
  text: string;
  byId: string;
  byName: string; // May be outdated, could be theoretically reconciled IF connected via awareness
  dateCreated: string;
  dateUpdated: string;
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};
