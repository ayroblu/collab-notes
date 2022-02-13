import React from "react";

import { nullable } from "@/modules/utils";

import { EditorContext } from "../Contexts";

export const useEditorScrollSync = (
  commentsPaneRef: React.RefObject<HTMLElement>,
  commentButtonWrapperRef: React.RefObject<HTMLElement>,
  extraOffset: number,
  scrollOffset: number
) => {
  const { editor } = React.useContext(EditorContext);
  const lastEditorScrollRef = React.useRef<string | null>(null);
  const lastCommentsPaneScrollRef = React.useRef<string | null>(null);
  const lastCommentButtonWrapperScrollRef = React.useRef<string | null>(null);
  const lastSmoothScrollRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // When the editor scrolls
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;
    const commentButtonWrapper = commentButtonWrapperRef.current;
    if (!commentButtonWrapper) return;

    let rafId = 0;
    const { dispose } = editor.onDidScrollChange((e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (
          !getIsRecent(lastCommentsPaneScrollRef.current, 100) &&
          !getIsRecent(lastCommentButtonWrapperScrollRef.current, 100) &&
          !getIsRecent(lastSmoothScrollRef.current, 800)
        ) {
          commentsPane.scrollTop = e.scrollTop + extraOffset + scrollOffset;
          commentButtonWrapper.scrollTop = e.scrollTop;
          lastEditorScrollRef.current = new Date().toISOString();
        }
      });
    });
    return () => {
      cancelAnimationFrame(rafId);
      dispose();
    };
  }, [
    commentButtonWrapperRef,
    commentsPaneRef,
    editor,
    extraOffset,
    scrollOffset,
  ]);

  React.useEffect(() => {
    // For when CommentsPane scrolls
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;
    const commentButtonWrapper = commentButtonWrapperRef.current;
    if (!commentButtonWrapper) return;

    let rafId = 0;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (
          !getIsRecent(lastEditorScrollRef.current, 100) &&
          !getIsRecent(lastCommentButtonWrapperScrollRef.current, 100) &&
          !getIsRecent(lastSmoothScrollRef.current, 800)
        ) {
          const editorScrollTop =
            commentsPane.scrollTop - extraOffset - scrollOffset;
          editor.setScrollTop(editorScrollTop);
          commentButtonWrapper.scrollTop = editorScrollTop;
          lastCommentsPaneScrollRef.current = new Date().toISOString();
        }
      });
    };
    commentsPane.addEventListener("scroll", handler);
    const dispose = () => {
      cancelAnimationFrame(rafId);
      commentsPane.removeEventListener("scroll", handler);
    };
    return () => {
      dispose();
    };
  }, [
    commentButtonWrapperRef,
    commentsPaneRef,
    editor,
    extraOffset,
    scrollOffset,
  ]);

  React.useEffect(() => {
    // For when CommentButtonWrapper scrolls
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;
    const commentButtonWrapper = commentButtonWrapperRef.current;
    if (!commentButtonWrapper) return;

    let rafId = 0;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (
          !getIsRecent(lastEditorScrollRef.current, 100) &&
          !getIsRecent(lastCommentsPaneScrollRef.current, 100) &&
          !getIsRecent(lastSmoothScrollRef.current, 800)
        ) {
          const editorScrollTop = commentButtonWrapper.scrollTop;
          editor.setScrollTop(editorScrollTop);
          commentsPane.scrollTop = editorScrollTop + extraOffset + scrollOffset;
          lastCommentButtonWrapperScrollRef.current = new Date().toISOString();
        }
      });
    };
    commentButtonWrapper.addEventListener("scroll", handler);
    const dispose = () => {
      commentButtonWrapper.removeEventListener("scroll", handler);
      cancelAnimationFrame(rafId);
    };
    return () => {
      dispose();
    };
  }, [
    commentButtonWrapperRef,
    commentsPaneRef,
    editor,
    extraOffset,
    scrollOffset,
  ]);

  // For when focus comment changes usually
  React.useEffect(() => {
    const commentsPane = commentsPaneRef.current;
    if (!editor) return;
    if (!commentsPane) return;
    commentsPane.scroll({
      top: editor.getScrollTop() + extraOffset + scrollOffset,
      behavior: "smooth",
    });
    lastSmoothScrollRef.current = new Date().toISOString();
  }, [commentsPaneRef, editor, extraOffset, scrollOffset]);
};

function getIsRecent(date: string | null, diff: number): boolean {
  const millis = getDateDiffMillis(date);
  if (nullable(millis)) {
    return false;
  }
  return millis < diff;
}
function getDateDiffMillis(date: string | null): number | null {
  if (!date) return null;
  return new Date().getTime() - new Date(date).getTime();
}
