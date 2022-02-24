import { DefaultValue, selector, selectorFamily } from "recoil";

import type { CommentData } from "@/modules/documents";
import { getNonNullable } from "@/modules/utils";

import { getNearestCommentId } from "../comments/utils";

import {
  activeFileNameState,
  activeRoomIdSelector,
  commentCollapsedState,
  commentHeightState,
  commentTopState,
  focusCommentIdState,
  inProgressCommentsState,
} from ".";

export const inProgressCommentsSelector = selector<CommentData[]>({
  key: "InProgressCommentsSelector",
  get: ({ get }) => {
    const roomId = get(activeRoomIdSelector);
    const fileName = get(activeFileNameState(roomId));
    return get(inProgressCommentsState({ roomId, fileName }));
  },
  set: ({ get, set }, newValue) => {
    const roomId = get(activeRoomIdSelector);
    const fileName = get(activeFileNameState(roomId));
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
      const activeRoomId = get(activeRoomIdSelector);
      const comments = get(
        inProgressCommentsState({ roomId: activeRoomId, fileName }),
      );
      return getNonNullable(comments.find(({ id }) => id === commentId));
    },
  set:
    ({ commentId, fileName }) =>
    ({ get, set }, newValue) => {
      const activeRoomId = get(activeRoomIdSelector);
      const comments = get(
        inProgressCommentsState({ roomId: activeRoomId, fileName }),
      );
      const result =
        newValue instanceof DefaultValue
          ? newValue
          : comments.map((comment) =>
              comment.id === commentId ? newValue : comment,
            );
      return set(
        inProgressCommentsState({ roomId: activeRoomId, fileName }),
        result,
      );
    },
});

export const commentSizeSelector = selectorFamily<
  { id: string; top: number; height: number }[],
  { commentIds: string[] }
>({
  key: "commentSizeSelector",
  get:
    ({ commentIds }) =>
    ({ get }) =>
      commentIds.map((id) => {
        const top = get(commentTopState(id));
        const height = get(commentHeightState(id));
        return { id, top, height };
      }),
  set:
    ({ commentIds }) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        commentIds.forEach((id) => {
          set(commentTopState(id), newValue);
          set(commentHeightState(id), newValue);
        });
        return;
      }
      for (const { height, id, top } of newValue) {
        set(commentTopState(id), top);
        set(commentHeightState(id), height);
      }
    },
});

export const focusNearestCommentIdSelector = selector<{
  commentIds: string[];
  commentId: string;
}>({
  key: "commentSizeSelector",
  // dummy for the types
  get: () => ({ commentIds: [] as string[], commentId: "" }),
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue)
      throw new Error("not a resetable selector");
    const { commentId, commentIds } = newValue;
    const commentSizes = get(commentSizeSelector({ commentIds }));
    const roomId = get(activeRoomIdSelector);
    const fileName = get(activeFileNameState(roomId));

    const nearestCommentId = getNearestCommentId(commentSizes, commentId);
    set(focusCommentIdState({ fileName, roomId }), nearestCommentId);
  },
});

export const commentCollapsedSelector = selectorFamily<
  boolean,
  { commentIds: string[] }
>({
  key: "commentCollapsedSelector",
  // dummy for the types
  get:
    ({ commentIds }) =>
    ({ get }) =>
      commentIds.every((id) => get(commentCollapsedState(id))),
  set:
    ({ commentIds }) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue)
        throw new Error("not a resetable selector");
      const isCollapsed = newValue;
      for (const commentId of commentIds) {
        set(commentCollapsedState(commentId), isCollapsed);
      }
    },
});
