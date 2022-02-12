import React from "react";
import { useSetRecoilState } from "recoil";

import { CommentsContext } from "../Contexts";
import { commentHeightState } from "../data-model";

export const useCommentHeight = (commentId: string) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const setCommentHeight = useSetRecoilState(commentHeightState(commentId));
  const cleanUpRef = React.useRef<(() => void) | null>(null);

  const observer = React.useCallback(() => {
    if (cleanUpRef.current) return;

    const commentEl = commentRefs.current[commentId];
    if (!commentEl) return;
    const ro = new ResizeObserver(() => {
      const height = commentEl.offsetHeight;
      setCommentHeight(height);
    });

    ro.observe(commentEl);
    cleanUpRef.current = () => {
      ro.unobserve(commentEl);
    };
  }, [commentId, commentRefs, setCommentHeight]);

  React.useEffect(() => () => cleanUpRef.current?.(), []);

  return observer;
};
