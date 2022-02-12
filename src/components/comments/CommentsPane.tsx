import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { createComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents";

import { CommentsContext } from "../Contexts";
import {
  focusCommentIsActiveState,
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
import { getNearestCommentId } from "./utils";

export const CommentsPane: React.FC = () => {
  const settings = useRecoilValue(settingsSelector);
  const setFocusCommentId = useSetFocusCommentIdState();
  const { commentRefs } = React.useContext(CommentsContext);
  const [inProgressComments, setInProgressComments] = useRecoilState(
    inProgressCommentsSelector
  );
  const comments = useComments();
  const { fileName, roomId, roomPassword } = useFileParams();
  const { extraOffset, offsets, scrollOffset } = useCommentOffsets();
  const { editorDivHeight, editorHeight } = useEditorHeight();
  const commentsPaneRef = React.useRef<HTMLElement>(null);
  const commentButtonWrapperRef = React.useRef<HTMLElement>(null);
  const [focusCommentId] = useFocusCommentIdState();
  const [focusCommentIsActive, setFocusCommentIsActive] = useRecoilState(
    focusCommentIsActiveState({ fileName, roomId })
  );
  useEditorScrollSync(
    commentsPaneRef,
    commentButtonWrapperRef,
    extraOffset,
    scrollOffset
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
      inProgressComments.filter(({ id }) => comment.id !== id)
    );
    createComment(roomId, roomPassword, fileName, comment);
  };
  const cancelCommentFn = (commentId: string) => () => {
    setInProgressComments(
      inProgressComments.filter(({ id }) => id !== commentId)
    );
    setFocusCommentId(
      getNearestCommentId(
        commentRefs.current,
        comments.concat(inProgressComments).map(({ id }) => id),
        commentId
      )
    );
    setFocusCommentIsActive(false);
    delete commentRefs.current[commentId];
  };
  return (
    <div className={styles.commentsWrapper}>
      <section
        className={styles.commentButtonContainer}
        style={{ height: editorDivHeight }}
        ref={commentButtonWrapperRef}
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
        style={{ height: editorDivHeight }}
        ref={commentsPaneRef}
      >
        <ul
          style={{
            height: editorHeight && editorHeight + extraOffset + scrollOffset,
          }}
        >
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                offset={(offsets[comment.id] ?? 0) + extraOffset}
                isFocusComment={focusCommentId === comment.id}
                isActiveComment={
                  focusCommentIsActive && focusCommentId === comment.id
                }
                {...comment}
              />
            </li>
          ))}
          {inProgressComments.map((comment) => (
            <li key={comment.id}>
              <AddComment
                offset={(offsets[comment.id] ?? 0) + extraOffset}
                id={comment.id}
                onSubmit={createCommentFn(comment)}
                onCancel={cancelCommentFn(comment.id)}
                isFocusComment={focusCommentId === comment.id}
                isActiveComment={
                  focusCommentIsActive && focusCommentId === comment.id
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
