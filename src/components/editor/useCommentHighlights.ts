import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { CommentsContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  focusCommentIdState,
} from "../data-model";
import { useComments } from "../utils";

import styles from "./useCommentHighlights.module.css";

export const useCommentHighlights = () => {
  const { commentRefs } = React.useContext(CommentsContext);
  const comments = useComments();
  React.useEffect(() => {
    let rafId = 0;
    const mouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        [...document.querySelectorAll(`.${styles.selection}`)].forEach((v) => {
          const isIn = isMouseInDOMRect(e, v.getBoundingClientRect());
          if (isIn && !v.classList.contains(styles.selectionHover)) {
            v.classList.add(styles.selectionHover);
          } else if (!isIn && v.classList.contains(styles.selectionHover)) {
            v.classList.remove(styles.selectionHover);
          }

          const classes = [...v.classList];
          const commentClass = classes.find((c) => c.startsWith("comment-"));
          if (!commentClass) return;
          const commentId = commentClass.replace("comment-", "");
          const el = commentRefs.current[commentId]?.el;
          if (!el) return;
          if (isIn) {
            el.classList.add(styles.commentHover);
          } else if (!isIn) {
            el.classList.remove(styles.commentHover);
          }
        });
      });
    };
    document.body.addEventListener("mousemove", mouseMove);
    return () => {
      document.body.removeEventListener("mousemove", mouseMove);
    };
  }, [commentRefs, comments]);
};
function isMouseInDOMRect(e: MouseEvent, r: DOMRect) {
  const isIn =
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom;
  return isIn;
}
export const useHighlightClick = () => {
  const { commentRefs } = React.useContext(CommentsContext);
  const comments = useComments();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const setFocusCommentId = useSetRecoilState(
    focusCommentIdState({ fileName, roomId })
  );
  React.useEffect(() => {
    let rafId = 0;
    const click = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        [...document.querySelectorAll(`.${styles.selection}`)].forEach((v) => {
          const isIn = isMouseInDOMRect(e, v.getBoundingClientRect());

          const classes = [...v.classList];
          const commentClass = classes.find((c) => c.startsWith("comment-"));
          if (!commentClass) return;
          const commentId = commentClass.replace("comment-", "");
          const el = commentRefs.current[commentId]?.el;
          if (!el) return;
          if (isIn) {
            setFocusCommentId(commentId);
          }
        });
      });
    };
    document.body.addEventListener("click", click);
    return () => {
      document.body.removeEventListener("click", click);
    };
  }, [commentRefs, comments, setFocusCommentId]);
};
// const useCommentHighlights = () => {
//   const { commentRefs, comments } = React.useContext(CommentsContext);
//   const { editorRef } = React.useContext(EditorContext);
//   React.useEffect(() => {
//     const editor = editorRef.current;
//     if (!editor) return;
//     let disposes: (() => void)[] = [];
//     const { dispose } = editor.onDidChangeModelDecorations(() => {
//       if (disposes.length === comments.length) return;
//       disposes.forEach((d) => d());
//       disposes = [...document.querySelectorAll(`.${styles.selection}`)].map(
//         (v) => {
//           const mouseEnter = () => {
//             const classes = [...v.classList];
//             const commentClass = classes.find((c) => c.startsWith("comment-"));
//             if (!commentClass) return;
//             const commentId = commentClass.replace("comment-", "");
//             const el = commentRefs.current[commentId]?.el;
//             if (!el) return;
//             el.classList.add(styles.commentHover);
//           };
//           const mouseLeave = () => {
//             const classes = [...v.classList];
//             const commentClass = classes.find((c) => c.startsWith("comment-"));
//             if (!commentClass) return;
//             const commentId = commentClass.replace("comment-", "");
//             const el = commentRefs.current[commentId]?.el;
//             if (!el) return;
//             el.classList.remove(styles.commentHover);
//           };
//           v.addEventListener("mouseenter", mouseEnter);
//           v.addEventListener("mouseleave", mouseLeave);
//           return () => {
//             v.removeEventListener("mouseenter", mouseEnter);
//             v.removeEventListener("mouseenter", mouseLeave);
//           };
//         }
//       );
//     });
//     return () => {
//       dispose();
//     };
//   }, [comments]);
// };