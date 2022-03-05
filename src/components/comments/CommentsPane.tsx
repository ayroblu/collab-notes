import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { createComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  focusCommentIsActiveState,
  focusNearestCommentIdSelector,
  inProgressCommentsSelector,
  settingsSelector,
} from "../data-model";
import {
  useComments,
  useFileParams,
  useFocusCommentIdState,
  useSetFocusCommentIdState,
} from "../utils";

import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { CommentButton } from "./CommentButton";
import styles from "./CommentsPane.module.css";
import { useCommentOffsets } from "./useCommentOffsets";
import { useEditorHeight } from "./useEditorHeight";
import { useEditorScrollSync } from "./useEditorScrollSync";

export const CommentsPane: React.FC = () => {
  const settings = useRecoilValue(settingsSelector);
  const setFocusCommentId = useSetFocusCommentIdState();
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

  const addInProgressComment = (selection: SelectionRange) => {
    const now = new Date().toISOString();
    const comment: CommentData = {
      selection,
      id: uuidv4(),
      byId: settings.id,
      byName: settings.name,
      dateCreated: now,
      dateUpdated: now,
      text: "",
    };
    setInProgressComments([...inProgressComments, comment]);
    setFocusCommentId(comment.id);
    setFocusCommentIsActive(true);
  };
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
          <CommentButton offset={0} onClick={addInProgressComment} />
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
