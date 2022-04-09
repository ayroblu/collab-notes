import type { WebrtcProvider } from "y-webrtc";
import type { WebsocketProvider } from "y-websocket";
import type * as Y from "yjs";

export type YRoom = {
  provider: WebrtcProvider;
  socketProviders: WebsocketProvider[];
  ydoc: Y.Doc;
  files: Y.Array<Y.Map<any>>;
  name: Y.Text;
  initialDbPromise: Promise<void>;
  initialConnectionPromise: Promise<void>;
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
  byName: string;
  dateCreated: string;
  dateUpdated: string;
  selection: SelectionRange;
  isResolved?: boolean;
};
export type SelectionRange = {
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};
export type ThreadData = {
  id: string; // uuid
  commentId: string;
  text: string;
  byId: string;
  byName: string;
  dateCreated: string;
  dateUpdated: string;
};
export type LocalState = {
  id: string;
  name: string;
  colour: string;
  lineNumber: number | undefined;
};
export type AwarenessStates = Map<number, { user: LocalState }>;
