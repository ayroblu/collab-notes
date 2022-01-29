import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

import type { CommentData } from "@/modules/documents";
import { generatePassword, getNonNullable } from "@/modules/utils";

import type { LeftNavEnum, Room } from "./types";

export const roomIdsState = atom<string[]>({
  key: "roomIdsState",
  default: [],
});
export const roomsState = atomFamily<Room, string>({
  key: "roomsState",
  default: (id) => ({ id, name: "", password: "" }),
  effects_UNSTABLE: (id) => [
    ({ onSet }) => {
      onSet((newId) => {
        console.log(newId);
      });
    },
  ],
});
export const roomsSelector = selectorFamily<Room[], string>({
  key: "roomsSelector",
  get:
    (fileName) =>
    ({ get }) => {
      const roomIds = get(roomIdsState);
      return roomIds.map((id) => get(roomsState(id)));
    },
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
    key: "InProgressCommentsSelector",
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
