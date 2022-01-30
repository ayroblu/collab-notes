import { atom, atomFamily } from "recoil";

import type { CommentData, FileMetaData } from "@/modules/documents";

import type { Room } from "./types";

export * from "./selectors";
export * from "./settings";
export * from "./types";

export const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: "",
});

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});

type RoomId = string;
export const activeFileNameState = atomFamily<string, RoomId>({
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
