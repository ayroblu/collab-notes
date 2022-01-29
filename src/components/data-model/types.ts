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
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};
