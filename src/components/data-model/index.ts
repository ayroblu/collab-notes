import { atom, atomFamily } from "recoil";

import type { CommentData, FileMetaData } from "@/modules/documents";
import { generatePassword, getRandomName, uuidv4 } from "@/modules/utils";

import type { Room, Settings } from "./types";

export * from "./selectors";
export * from "./types";
export * from "./async-selectors";

export const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: generatePassword(),
});

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});

export const activeFileNameState = atomFamily<string, { roomId: string }>({
  key: "activeFileNameState",
  default: () => "",
});

export const filesDataState = atom<FileMetaData[]>({
  key: "filesDataState",
  default: [],
});

export const isNewUserState = atom<boolean>({
  key: "isNewUserState",
  default: false,
});

export const inProgressCommentsState = atomFamily<
  CommentData[],
  { fileName: string; roomId: string }
>({
  key: "inProgressCommentsState",
  default: () => [] as CommentData[],
});

export const commentsState = atomFamily<
  CommentData[],
  { fileName: string; roomId: string }
>({
  key: "commentsState",
  default: () => [] as CommentData[],
});

export const focusCommentIdState = atomFamily<
  string | null,
  { fileName: string; roomId: string }
>({
  key: "focusCommentIdState",
  default: () => null,
});

export const lastUpdatedState = atom<string>({
  key: "lastUpdatedState",
  default: new Date().toISOString(),
});

const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const defaultSettings: Settings = {
  isVim: false,
  vimrc: "imap jk <Esc>\nimap jj <Esc>",
  wordWrap: true,
  name: getRandomName(),
  theme: isDark ? "vs-dark" : "vs",
  rooms: [],
  leftNav: null,
  id: uuidv4(),
};

export const settingsState = atom<Settings>({
  key: "settingsState",
  default: defaultSettings,
});
