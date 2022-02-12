import { sortBy } from "@/modules/utils";

export function getCommentDetails(
  commentSizes: { id: string; top: number; height: number }[]
) {
  return commentSizes.sort(sortBy([({ top }) => top], ["asc"]));
}

export function getNearestCommentId(
  commentSizes: { id: string; top: number; height: number }[],
  commentId: string
) {
  const commentDetails = getCommentDetails(commentSizes);
  const index = commentDetails.findIndex(({ id }) => id === commentId);
  if (index === -1) return null;
  const newIndex = Math.min(commentDetails.length - 2, index + 1);
  return commentDetails[newIndex]?.id ?? null;
}
