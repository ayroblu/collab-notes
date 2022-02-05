import { sortBy } from "@/modules/utils";

import type { CommentLayout } from "../Contexts";

export function getCommentDetails(
  commentRefs: { [key: string]: CommentLayout },
  commentIds: string[]
) {
  const commentIdsSet = new Set(commentIds);
  return Object.entries(commentRefs)
    .map(([id, { el, height, top }]) => ({ id, el, top, height }))
    .filter(({ id }) => commentIdsSet.has(id))
    .sort(sortBy([({ top }) => top], ["asc"]));
}

export function getNearestCommentId(
  commentRefs: { [key: string]: CommentLayout },
  commentIds: string[],
  commentId: string
) {
  const commentDetails = getCommentDetails(commentRefs, commentIds);
  const index = commentDetails.findIndex(({ id }) => id === commentId);
  if (index === -1) return null;
  const newIndex = Math.min(commentDetails.length - 2, index + 1);
  return commentDetails[newIndex]?.id ?? null;
}
