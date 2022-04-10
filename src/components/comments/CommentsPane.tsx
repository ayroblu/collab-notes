import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { createComment } from "@/modules/documents";
import type { CommentData } from "@/modules/documents";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  focusCommentIsActiveState,
  focusNearestCommentIdSelector,
  inProgressCommentsSelector,
} from "../data-model";
import { useComments, useFileParams, useFocusCommentIdState } from "../utils";

import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { CommentButton } from "./CommentButton";
import styles from "./CommentsPane.module.css";
import { useCommentOffsets } from "./useCommentOffsets";
import { useEditorHeight } from "./useEditorHeight";
import { useEditorScrollSync } from "./useEditorScrollSync";

export const CommentsPane: React.FC = () => {
  const { commentRefs } = React.useContext(CommentsContext);
  const { editor } = React.useContext(EditorContext);
  const [inProgressComments, setInProgressComments] = useRecoilState(
    inProgressCommentsSelector,
  );
  const comments = useComments();
  const { fileName, roomId, roomPassword } = useFileParams();
  const { extraOffset, offsets, scrollOffset } = useCommentOffsets();
  const { editorDivHeight, editorHeight } = useEditorHeight();
  const commentsPaneRef = React.useRef<HTMLElement>(null);
  const commentButtonWrapperRef = React.useRef<HTMLElement>(null);
  const [focusCommentId] = useFocusCommentIdState();
  const [focusCommentIsActive, setFocusCommentIsActive] = useRecoilState(
    focusCommentIsActiveState({ fileName, roomId }),
  );
  const setNearestFocusCommentId = useSetRecoilState(
    focusNearestCommentIdSelector,
  );
  useEditorScrollSync(
    commentsPaneRef,
    commentButtonWrapperRef,
    extraOffset,
    scrollOffset,
  );

  const createCommentFn = (comment: CommentData) => () => {
    setInProgressComments(
      inProgressComments.filter(({ id }) => comment.id !== id),
    );
    createComment(roomId, roomPassword, fileName, comment);
    editor?.focus();
  };
  const cancelCommentFn = (commentId: string) => () => {
    setInProgressComments(
      inProgressComments.filter(({ id }) => id !== commentId),
    );
    const commentIds = comments.concat(inProgressComments).map(({ id }) => id);
    setNearestFocusCommentId({ commentIds, commentId });
    setFocusCommentIsActive(false);
    delete commentRefs.current[commentId];
  };
  return (
    <div className={styles.commentsWrapper}>
      <section
        className={styles.commentButtonContainer}
        ref={commentButtonWrapperRef}
        style={{ height: editorDivHeight }}
      >
        <div
          style={{
            height: editorHeight,
          }}
        >
          <CommentButton offset={0} />
        </div>
      </section>
      <section
        className={styles.commentsPane}
        ref={commentsPaneRef}
        style={{ height: editorDivHeight }}
      >
        <ul
          style={{
            height: editorHeight && editorHeight + extraOffset + scrollOffset,
          }}
        >
          {comments.filter(commentHasVisibleSelection).map((comment) => (
            <li key={comment.id}>
              <Comment
                isActiveComment={
                  focusCommentIsActive && focusCommentId === comment.id
                }
                isFocusComment={focusCommentId === comment.id}
                offset={(offsets[comment.id] ?? 0) + extraOffset}
                {...comment}
              />
            </li>
          ))}
          {inProgressComments
            .filter(commentHasVisibleSelection)
            .map((comment) => (
              <li key={comment.id}>
                <AddComment
                  id={comment.id}
                  isActiveComment={
                    focusCommentIsActive && focusCommentId === comment.id
                  }
                  isFocusComment={focusCommentId === comment.id}
                  offset={(offsets[comment.id] ?? 0) + extraOffset}
                  onCancel={cancelCommentFn(comment.id)}
                  onSubmit={createCommentFn(comment)}
                />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

function commentHasVisibleSelection({ selection }: CommentData) {
  return !(
    selection.startLineNumber === selection.endLineNumber &&
    selection.startColumn === selection.endColumn
  );
}
