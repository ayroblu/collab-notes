import isEqual from "lodash/isEqual";
import type * as Y from "yjs";

import { nonNullable } from "../utils";

import type { CommentData, SelectionRange } from "./types";

import { getFileFromFileName, getRoom, getYFileComments } from ".";

export function getComments(
  roomId: string,
  roomPassword: string,
  fileName: string,
): Y.Array<CommentData> | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  if (!file) return;
  return getYFileComments(file);
}
export function createComment(
  roomId: string,
  roomPassword: string,
  fileName: string,
  comment: CommentData,
) {
  const yComments = getComments(roomId, roomPassword, fileName);
  if (!yComments) return;
  const now = new Date().toISOString();
  yComments.push([
    {
      ...comment,
      dateCreated: now,
      dateUpdated: now,
    },
  ]);
}
export function editComment(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string,
  text: string,
) {
  const { ydoc } = getRoom(roomId, roomPassword);
  const yComments = getComments(roomId, roomPassword, fileName);
  if (!yComments) return;
  const index = yComments
    .map(({ id }) => id)
    .findIndex((id) => id === commentId);

  const now = new Date().toISOString();
  const comment = yComments.get(index);
  ydoc.transact(() => {
    yComments.delete(index);
    yComments.insert(index, [{ ...comment, text, dateUpdated: now }]);
  });
}
export function updateCommentSelection(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string,
  selection: SelectionRange,
) {
  const { ydoc } = getRoom(roomId, roomPassword);
  const yComments = getComments(roomId, roomPassword, fileName);
  if (!yComments) return;
  const index = yComments
    .map(({ id }) => id)
    .findIndex((id) => id === commentId);

  if (index === -1) return;
  const comment = yComments.get(index);
  if (!isEqual(selection, comment.selection)) {
    ydoc.transact(() => {
      yComments.delete(index);
      yComments.insert(index, [{ ...comment, selection }]);
    });
  }
}
export function removeComment(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string,
): boolean {
  const yComments = getComments(roomId, roomPassword, fileName);
  if (!yComments) return false;
  const index = yComments
    .map(({ id }) => id)
    .findIndex((id) => id === commentId);
  if (index === -1) return false;

  yComments.delete(index);
  return true;
}

export function resolveComment(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string,
) {
  const { ydoc } = getRoom(roomId, roomPassword);
  const yComments = getComments(roomId, roomPassword, fileName);
  if (!yComments) return;
  const index = yComments
    .map(({ id }) => id)
    .findIndex((id) => id === commentId);

  if (index === -1) return;
  const comment = yComments.get(index);

  ydoc.transact(() => {
    yComments.delete(index);
    yComments.insert(index, [{ ...comment, isResolved: true }]);
  });
}

export const syncCommentNamesFn = (
  roomId: string,
  roomPassword: string,
  fileName: string,
) => {
  const { ydoc } = getRoom(roomId, roomPassword);
  const comments = getComments(roomId, roomPassword, fileName);

  return (id: string, name: string) => {
    if (!comments) return;
    const toChange: number[] = [];
    comments.forEach(({ byId, byName }, i) => {
      if (id === byId && byName !== name) {
        toChange.push(i);
      }
    });
    ydoc.transact(() => {
      toChange.forEach((i) => {
        const comment = comments.get(i);
        comments.delete(i);
        comments.insert(i, [{ ...comment, byName: name }]);
      });
    });
  };
};

export function deduplicateComments(comments: Y.Array<CommentData>) {
  const seenCommentIds: { [commentId: string]: number } = {};
  for (let i = comments.length - 1; i >= 0; --i) {
    const comment = comments.get(i);
    const seenIndex = seenCommentIds[comment.id];
    if (nonNullable(seenIndex)) {
      const otherComment = comments.get(seenIndex);
      // If one is newer, delete the older one, otherwise, delete the greater index one
      const indexToDelete =
        new Date(otherComment.dateUpdated) > new Date(comment.dateUpdated)
          ? i
          : seenIndex;
      comments.delete(indexToDelete);
    } else {
      seenCommentIds[comment.id] = i;
    }
  }
}
