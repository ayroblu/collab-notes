import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

export type YRoom = {
  provider: WebrtcProvider;
  ydoc: Y.Doc;
  files: Y.Array<YFile>;
  name: Y.Text;
  initialDbPromise: Promise<void>;
};
export type YFile = {
  metadata: Y.Map<FileMetaData>;
  comments: Y.Array<CommentData>;
  text: Y.Text;
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
};
