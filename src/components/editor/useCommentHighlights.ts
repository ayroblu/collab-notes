import * as monaco from "monaco-editor";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import type { SelectionRange } from "@/modules/documents";
import { getComments, updateCommentSelection } from "@/modules/documents";
import { cn } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  focusCommentIdState,
  focusCommentIsActiveState,
  inProgressCommentsSelector,
} from "../data-model";
import { useComments, useRoom } from "../utils";

import styles from "./useCommentHighlights.module.css";

export const useCommentDecorationsHover = () => {
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

          // const classes = [...v.classList];
          // const commentClass = classes.find((c) => c.startsWith("comment-"));
          // if (!commentClass) return;
          // const commentId = commentClass.replace("comment-", "");
          // const el = commentRefs.current[commentId];
          // if (!el) return;
          // if (isIn) {
          //   el.classList.add(styles.commentHover);
          // } else if (!isIn) {
          //   el.classList.remove(styles.commentHover);
          // }
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
export const useSelectionHandler = () => {
  const { editor } = React.useContext(EditorContext);
  const comments = useComments();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const setFocusCommentId = useSetRecoilState(
    focusCommentIdState({ fileName, roomId }),
  );
  const setFocusCommentIsActive = useSetRecoilState(
    focusCommentIsActiveState({ fileName, roomId }),
  );
  React.useEffect(() => {
    let rafId = 0;
    if (!editor) return;
    const { dispose } = editor.onDidChangeCursorSelection((e) => {
      const sel = e.selection;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const foundComment = comments.find(({ selection }) =>
          cursorInSelection(selection, sel.startLineNumber, sel.startColumn),
        );
        if (foundComment) {
          if (
            cursorInSelection(
              foundComment.selection,
              sel.startLineNumber,
              sel.endColumn,
            )
          ) {
            setFocusCommentId(foundComment.id);
            setFocusCommentIsActive(true);
          } else {
            setFocusCommentIsActive(false);
          }
        } else {
          setFocusCommentIsActive(false);
        }
      });
    });
    return () => {
      dispose();
    };
  }, [comments, editor, setFocusCommentId, setFocusCommentIsActive]);
};

function cursorInSelection(
  selection: SelectionRange,
  lineNumber: number,
  columnNumber: number,
) {
  return (
    selection.startLineNumber <= lineNumber &&
    selection.endLineNumber >= lineNumber &&
    selection.startColumn <= columnNumber &&
    selection.endColumn >= columnNumber
  );
}

export const useCommentDecorations = () => {
  const { editor } = React.useContext(EditorContext);
  const comments = useComments();
  const inProgressComments = useRecoilValue(inProgressCommentsSelector);
  const [, setDecorations] = React.useState<string[]>([]);
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  React.useEffect(() => {
    const newDecorations = [
      ...[...comments, ...inProgressComments].map(
        ({
          id,
          selection: { endColumn, endLineNumber, startColumn, startLineNumber },
          text,
        }) => ({
          range: new monaco.Range(
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn,
          ),
          options: {
            // inlineClassName: cn(styles.selection, `comment-${id}`),
            className: cn(styles.selection, `comment-${id}`),
            hoverMessage: { value: text },
          },
        }),
      ),
    ];
    if (!editor) return;
    // TODO: Why set timeout is necessary here? Decorations show double hover without it
    // I tried editor.onDidLayoutChange but that didn't work
    const timeoutId = window.setTimeout(() => {
      setDecorations((decorations) =>
        editor.deltaDecorations(decorations, newDecorations),
      );
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inProgressComments, comments, editor]);

  const room = useRoom();
  React.useEffect(() => {
    // Adjust decorations based on typing that happens
    if (!editor || !room) return;
    const comments = getComments(room.id, room.password, fileName);
    if (!comments) return;
    let commentsThrottleTimeoutId = 0;
    const { dispose } = editor.onDidChangeModelDecorations(() => {
      clearTimeout(commentsThrottleTimeoutId);
      commentsThrottleTimeoutId = window.setTimeout(() => {
        const model = editor.getModel();
        if (!model) return;
        const decorations = model.getAllDecorations();
        decorations
          .map(({ options, range }) => ({
            commentId: options.className
              ?.split(" ")
              .filter((c) => c.startsWith("comment-"))
              .map((c) => c.replace("comment-", ""))[0],
            range: {
              startLineNumber: range.startLineNumber,
              startColumn: range.startColumn,
              endLineNumber: range.endLineNumber,
              endColumn: range.endColumn,
            },
          }))
          .filter(({ commentId }) => commentId)
          .forEach(({ commentId, range }) => {
            if (!commentId) return;
            updateCommentSelection(
              room.id,
              room.password,
              fileName,
              commentId,
              range,
            );
          });
      }, 1000);
    });
    return () => {
      clearTimeout(commentsThrottleTimeoutId);
      dispose();
    };
  }, [editor, fileName, room]);
};

export const useCommentHighlightActive = () => {
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const focusCommentId = useRecoilValue(
    focusCommentIdState({ fileName, roomId }),
  );
  const oldFocusCommentIdRef = React.useRef<string | null>(null);
  const focusCommentIsActive = useRecoilValue(
    focusCommentIsActiveState({ fileName, roomId }),
  );

  React.useEffect(() => {
    const highlight = document.querySelector(
      `.${styles.selection}.comment-${focusCommentId}`,
    );
    if (highlight) {
      if (focusCommentIsActive) {
        highlight.classList.add(styles.selectionFocus);
      } else {
        highlight.classList.remove(styles.selectionFocus);
      }
    }
    const oldCommentId = oldFocusCommentIdRef.current;
    if (oldCommentId !== focusCommentId) {
      if (oldCommentId) {
        const highlight = document.querySelector(
          `.${styles.selection}.comment-${oldCommentId}`,
        );
        if (highlight) {
          highlight.classList.remove(styles.selectionFocus);
        }
      }
      oldFocusCommentIdRef.current = focusCommentId;
    }
  }, [focusCommentId, focusCommentIsActive]);
};
