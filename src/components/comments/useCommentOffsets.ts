import React from "react";
import { useRecoilValue } from "recoil";

import { useIsMounted } from "@/hooks/useIsMounted";
import { sortBy } from "@/modules/utils";

import { CommentsContext } from "../Contexts";
import { inProgressCommentsSelector } from "../data-model";
import { useComments, useFocusCommentIdState } from "../utils";

const commentGap = 8;
export const useCommentOffsets = () => {
  const { commentRefs } = React.useContext(CommentsContext);
  const comments = useComments();
  const [focusCommentId] = useFocusCommentIdState();
  const inProgressComments = useRecoilValue(inProgressCommentsSelector);
  const [offsets, setOffsets] = React.useState<{ [key: string]: number }>({});
  const [extraOffset, setExtraOffset] = React.useState<number>(0);
  const [scrollOffset, setScrollOffset] = React.useState<number>(0);
  const getIsMounted = useIsMounted();

  React.useEffect(() => {
    const commentIdsSet = new Set(
      comments
        .map(({ id }) => id)
        .concat(inProgressComments.map(({ id }) => id))
    );
    const commentDetails = Object.entries(commentRefs.current)
      .map(([id, { el, height, top }]) => ({ id, el, top, height }))
      .filter(({ id }) => commentIdsSet.has(id))
      .sort(sortBy([({ top }) => top], ["asc"]));

    updateOffsets({
      commentDetails,
      focusCommentId,
      setExtraOffset,
      setOffsets,
      setScrollOffset,
      getIsMounted,
    });
    attachResizeObserver(
      commentDetails.map(({ el }) => el),
      () => {
        updateOffsets({
          commentDetails,
          focusCommentId,
          setExtraOffset,
          setOffsets,
          setScrollOffset,
          getIsMounted,
        });
      }
    );
  }, [focusCommentId, comments, inProgressComments, commentRefs, getIsMounted]);
  return { offsets, extraOffset, scrollOffset };
};

type UpdateOffsetsParams = {
  focusCommentId: string | null;
  commentDetails: {
    id: string;
    el: HTMLElement;
    top: number;
    height: number;
  }[];
  setExtraOffset: (offset: number) => void;
  setScrollOffset: (offset: number) => void;
  setOffsets: (offsets: { [key: string]: number }) => void;
  getIsMounted: () => boolean;
};
function updateOffsets({
  commentDetails,
  focusCommentId,
  getIsMounted,
  setExtraOffset,
  setOffsets,
  setScrollOffset,
}: UpdateOffsetsParams) {
  if (!getIsMounted()) return;
  function getFocusCommentIndex() {
    if (typeof focusCommentId === "string") {
      const index = commentDetails.findIndex(({ id }) => id === focusCommentId);
      if (index === -1) return 0;
      return index;
    } else {
      return 0;
    }
  }
  const focusCommentIndex = getFocusCommentIndex();
  if (focusCommentIndex === 0 && commentDetails.length) {
    const comment = commentDetails[0]!;
    const topOffset = comment.top - commentGap;
    setExtraOffset(topOffset < 0 ? -topOffset : 0);
    setScrollOffset(topOffset);
  } else {
    setScrollOffset(0);
  }

  if (commentDetails.length < 2) return;

  const newOffsets: { [key: string]: number } = {};
  for (let i = focusCommentIndex - 1; i >= 0; --i) {
    const belowComment = commentDetails[i + 1]!;
    const comment = commentDetails[i]!;
    const commentBottom = comment.top + comment.height + commentGap;
    const adjustedBelowCommentTop =
      belowComment.top + (newOffsets[belowComment.id] ?? 0);
    if (commentBottom > adjustedBelowCommentTop) {
      newOffsets[comment.id] = -(commentBottom - adjustedBelowCommentTop);
      if (i === 0) {
        const topOffset = comment.top + newOffsets[comment.id]! - commentGap;
        setExtraOffset(topOffset < 0 ? -topOffset : 0);
      }
    }
  }
  for (let i = focusCommentIndex + 1; i < commentDetails.length; ++i) {
    const aboveComment = commentDetails[i - 1]!;
    const comment = commentDetails[i]!;
    const aboveCommentBottom =
      aboveComment.top +
      aboveComment.height +
      commentGap +
      (newOffsets[aboveComment.id] || 0);
    if (aboveCommentBottom > comment.top) {
      newOffsets[comment.id] = aboveCommentBottom - comment.top;
    }
  }
  setOffsets(newOffsets);
}

function attachResizeObserver(els: HTMLElement[], func: () => void) {
  let rafId = 0;
  const disposes = els.map((el) => {
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        func();
      });
    });

    // Observe the scrollingElement for when the window gets resized
    ro.observe(el);
    return () => {
      ro.unobserve(el);
    };
  });
  return () => {
    disposes.forEach((dispose) => dispose());
  };
}
