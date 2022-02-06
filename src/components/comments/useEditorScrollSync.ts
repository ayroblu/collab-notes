import React from "react";

import { nullable } from "@/modules/utils";

import { EditorContext } from "../Contexts";

export const useEditorScrollSync = (
  commentsPaneRef: React.RefObject<HTMLElement>,
  extraOffset: number,
  scrollOffset: number
) => {
  const { editorRef } = React.useContext(EditorContext);
  const lastEditorScrollRef = React.useRef<string | null>(null);
  const lastCommentsPaneScrollRef = React.useRef<string | null>(null);
  const lastSmoothScrollRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // When the editor scrolls, reflect in the CommentsPane
    const editor = editorRef.current;
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;

    let rafId = 0;
    const { dispose } = editor.onDidScrollChange((e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (
          !getIsRecent(lastCommentsPaneScrollRef.current, 100) &&
          !getIsRecent(lastSmoothScrollRef.current, 800)
        ) {
          commentsPane.scrollTop = e.scrollTop + extraOffset + scrollOffset;
          lastEditorScrollRef.current = new Date().toISOString();
        }
      });
    });
    return () => {
      dispose();
    };
  }, [commentsPaneRef, editorRef, extraOffset, scrollOffset]);

  React.useEffect(() => {
    // For when CommentsPane scrolls, reflect in editor
    const editor = editorRef.current;
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;

    let rafId = 0;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (
          !getIsRecent(lastEditorScrollRef.current, 100) &&
          !getIsRecent(lastSmoothScrollRef.current, 800)
        ) {
          editor.setScrollTop(
            commentsPane.scrollTop - extraOffset - scrollOffset
          );
          lastCommentsPaneScrollRef.current = new Date().toISOString();
        }
      });
    };
    commentsPane.addEventListener("scroll", handler);
    const dispose = () => {
      commentsPane.removeEventListener("scroll", handler);
    };
    return () => {
      dispose();
    };
  }, [commentsPaneRef, editorRef, extraOffset, scrollOffset]);

  // For when focus comment changes usually
  React.useEffect(() => {
    const editor = editorRef.current;
    const commentsPane = commentsPaneRef.current;
    if (!editor) return;
    if (!commentsPane) return;
    commentsPane.scroll({
      top: editor.getScrollTop() + extraOffset + scrollOffset,
      behavior: "smooth",
    });
    lastSmoothScrollRef.current = new Date().toISOString();
  }, [commentsPaneRef, editorRef, extraOffset, scrollOffset]);
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
