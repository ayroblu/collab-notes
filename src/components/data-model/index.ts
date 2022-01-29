import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";

import type { CommentData } from "@/modules/documents";
import { generatePassword, getNonNullable } from "@/modules/utils";

export * from "./types";

export const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: generatePassword(),
});

export const activeFileNameState = atomFamily<string, { roomId: string }>({
  key: "activeFileNameState",
  default: () => "",
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

export const inProgressCommentsSelector = selector<CommentData[]>({
  key: "InProgressCommentsSelector",
  get: ({ get }) => {
    const roomId = get(activeRoomIdState);
    const fileName = get(activeFileNameState({ roomId }));
    return get(inProgressCommentsState({ roomId, fileName }));
  },
  set: ({ get, set }, newValue) => {
    const roomId = get(activeRoomIdState);
    const fileName = get(activeFileNameState({ roomId }));
    return set(inProgressCommentsState({ roomId, fileName }), newValue);
  },
});

export const inProgressCommentSelector = selectorFamily<
  CommentData,
  { fileName: string; commentId: string }
>({
  key: "inProgressCommentSelector",
  get:
    ({ commentId, fileName }) =>
    ({ get }) => {
      const activeRoomId = get(activeRoomIdState);
      const comments = get(
        inProgressCommentsState({ roomId: activeRoomId, fileName })
      );
      return getNonNullable(comments.find(({ id }) => id === commentId));
    },
  set:
    ({ commentId, fileName }) =>
    ({ get, set }, newValue) => {
      const activeRoomId = get(activeRoomIdState);
      const comments = get(
        inProgressCommentsState({ roomId: activeRoomId, fileName })
      );
      const result =
        newValue instanceof DefaultValue
          ? newValue
          : comments.map((comment) =>
              comment.id === commentId ? newValue : comment
            );
      return set(
        inProgressCommentsState({ roomId: activeRoomId, fileName }),
        result
      );
    },
});
