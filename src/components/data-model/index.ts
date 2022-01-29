import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

import type { CommentData } from "@/modules/documents";
import { generatePassword, getNonNullable } from "@/modules/utils";

import type { LeftNavEnum, Room } from "./types";

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});
export const roomState = (id: string) =>
  atom<Room>({
    key: `roomsState-${id}`,
    default: { id, name: "", password: "" },
  });
export const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: generatePassword(),
});

export const leftNavState = atom<LeftNavEnum | null>({
  key: "leftNavState",
  default: null,
});

export const inProgressCommentsState = atomFamily<
  CommentData[],
  { fileName: string; roomId: string }
>({
  key: "inProgressCommentsState",
  default: () => [] as CommentData[],
});

export const inProgressCommentsSelector = selectorFamily<CommentData[], string>(
  {
    key: "getInProgressCommentsSelector",
    get:
      (fileName) =>
      ({ get }) => {
        const activeRoomId = get(activeRoomIdState);
        return get(inProgressCommentsState({ roomId: activeRoomId, fileName }));
      },
    set:
      (fileName) =>
      ({ get, set }, newValue) => {
        const activeRoomId = get(activeRoomIdState);
        return set(
          inProgressCommentsState({ roomId: activeRoomId, fileName }),
          newValue
        );
      },
  }
);

export const inProgressCommentSelector = selectorFamily<
  CommentData,
  { fileName: string; commentId: string }
>({
  key: "getInProgressCommentSelector",
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
