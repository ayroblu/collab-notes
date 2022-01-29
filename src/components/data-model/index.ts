import { atom, atomFamily } from "recoil";

import type { CommentData, FileMetaData } from "@/modules/documents";
import { generatePassword } from "@/modules/utils";

export * from "./selectors";
export * from "./types";

export const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: generatePassword(),
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
