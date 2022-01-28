import React from "react";
import { useSearchParams } from "react-router-dom";

import { getComments, syncCommentNamesFn } from "@/modules/documents";
import { nullable, sortBy } from "@/modules/utils";

import { CommentsContext, EditorContext, SettingsContext } from "../Contexts";

import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { CommentButton } from "./CommentButton";
import styles from "./CommentsPane.module.css";
import type { SelectionRange } from "./types";

export const CommentsPane: React.FC = () => {
  const { editorDivRef } = React.useContext(EditorContext);
  const { inProgressSelections, setFocusCommentId, setInProgressSelections } =
    React.useContext(CommentsContext);
  const comments = useCommentsSync();
  useCommentNamesSync();
  const createComment = useCreateComment();
  const { extraOffset, offsets } = useCommentOffsets();
  const editorHeight = useEditorHeight();
  const commentsPaneRef = React.useRef<HTMLElement>(null);
  useEditorScrollSync(commentsPaneRef, extraOffset);

  const editorDivHeight = editorDivRef.current
    ? editorDivRef.current.getBoundingClientRect().height
    : window.innerHeight;

  const addInProgressComment = (selection: SelectionRange) => {
    setInProgressSelections([...inProgressSelections, selection]);
    setFocusCommentId(selection.id);
  };
  const createCommentFn = (selection: SelectionRange) => (text: string) => {
    setInProgressSelections(
      inProgressSelections.filter(({ id }) => selection.id !== id)
    );
    text && createComment && createComment(text, selection);
  };
  const cancelCommentFn = (selectionId: string) => () => {
    setInProgressSelections(
      inProgressSelections.filter(({ id }) => id !== selectionId)
    );
    setFocusCommentId(null);
  };
  return (
    <section
      className={styles.commentsPane}
      style={{ height: editorDivHeight }}
      ref={commentsPaneRef}
    >
      <ul style={{ height: editorHeight && editorHeight + extraOffset }}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment
              offset={(offsets[comment.id] ?? 0) + extraOffset}
              {...comment}
            />
          </li>
        ))}
        {inProgressSelections.map((sel) => (
          <li key={JSON.stringify(sel)}>
            <AddComment
              selection={sel}
              offset={(offsets[sel.id] ?? 0) + extraOffset}
              id={sel.id}
              onSubmit={createCommentFn(sel)}
              onCancel={cancelCommentFn(sel.id)}
            />
          </li>
        ))}
      </ul>
      <CommentButton offset={extraOffset} onClick={addInProgressComment} />
    </section>
  );
};

const useCommentsSync = () => {
  const { settings } = React.useContext(SettingsContext);
  const { comments, setComments } = React.useContext(CommentsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  React.useEffect(() => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    if (!fileName) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;
    setComments(yComments.toArray());

    const changeListener = () => {
      setComments(yComments.toArray());
    };
    yComments.observe(changeListener);
    return () => {
      yComments.unobserve(changeListener);
    };
  }, [settings.activeRoomId, settings.rooms, fileName]);

  return comments;
};

const useCommentNamesSync = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  React.useEffect(() => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    if (!fileName) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;

    syncCommentNamesFn(
      room.id,
      room.password,
      fileName
    )(settings.id, settings.name);
  }, [settings.activeRoomId, settings.name, fileName]);
};

const useCreateComment = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  if (!room) return;
  if (!fileName) return;
  const yComments = getComments(room.id, room.password, fileName);
  if (!yComments) return;
  return (text: string, selection: SelectionRange) => {
    const now = new Date().toISOString();
    yComments.push([
      {
        text,
        byId: settings.id,
        byName: settings.name,
        dateCreated: now,
        dateUpdated: now,
        ...selection,
      },
    ]);
  };
};

const commentGap = 8;
const useCommentOffsets = () => {
  const { commentRefs, comments, focusCommentId, inProgressSelections } =
    React.useContext(CommentsContext);
  const [offsets, setOffsets] = React.useState<{ [key: string]: number }>({});
  const [extraOffset, setExtraOffset] = React.useState<number>(0);
  React.useEffect(() => {
    const commentDetails = Object.entries(commentRefs.current)
      .map(([id, { el, height, top }]) => ({ id, el, top, height }))
      .sort(sortBy([({ top }) => top], ["asc"]));
    if (commentDetails.length < 2) return;
    function getFocusCommentIndex() {
      if (typeof focusCommentId === "string") {
        const index = commentDetails.findIndex(
          ({ id }) => id === focusCommentId
        );
        if (index === -1) return 0;
        return index;
      } else {
        return 0;
      }
    }
    const newOffsets: { [key: string]: number } = {};
    const focusCommentIndex = getFocusCommentIndex();
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
  }, [focusCommentId, comments, inProgressSelections]);
  return { offsets, extraOffset };
};

const useEditorHeight = () => {
  const { editorRef } = React.useContext(EditorContext);
  const editor = editorRef.current;
  if (!editor) return;
  return editor.getContentHeight();
};

const useEditorScrollSync = (
  commentsPaneRef: React.RefObject<HTMLElement>,
  extraOffset: number
) => {
  const { editorRef } = React.useContext(EditorContext);
  const lastEditorScrollRef = React.useRef<string | null>(null);
  const lastCommentsPaneScrollRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;

    let rafId = 0;
    const { dispose } = editor.onDidScrollChange((e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!getIsRecent(lastCommentsPaneScrollRef.current, 100)) {
          commentsPane.scrollTop = e.scrollTop + extraOffset;
          lastEditorScrollRef.current = new Date().toISOString();
        }
      });
    });
    return () => {
      dispose();
    };
  }, [extraOffset]);

  React.useEffect(() => {
    // For when commentspane scrolls, reflect in editor
    const editor = editorRef.current;
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;

    let rafId = 0;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!getIsRecent(lastEditorScrollRef.current, 100)) {
          editor.setScrollTop(commentsPane.scrollTop - extraOffset);
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
  }, [extraOffset]);

  // For when focus comment changes usually
  React.useEffect(() => {
    const editor = editorRef.current;
    const commentsPane = commentsPaneRef.current;
    if (!editor) return;
    if (!commentsPane) return;
    commentsPane.scrollTop = editor.getScrollTop() + extraOffset;
  }, [extraOffset]);
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
