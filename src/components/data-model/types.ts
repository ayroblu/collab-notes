export type Room = {
  id: string;
  name: string;
  password: string;
};

export enum LeftNavEnum {
  files = "files",
  rooms = "rooms",
}

export type SelectionRange = {
  id: string;
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};
