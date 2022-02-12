export type Room = {
  id: string;
  password: string;
};

export enum LeftNavEnum {
  files = "files",
  rooms = "rooms",
}

export type Settings = {
  isVim: boolean;
  vimrc: string;
  wordWrap: boolean;
  name: string;
  theme: string;
  rooms: Room[];
  id: string;
};
