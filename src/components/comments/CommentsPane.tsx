import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { getComments } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents";

import { CommentsContext } from "../Contexts";
import { inProgressCommentsSelector, settingsSelector } from "../data-model";
import {
  useComments,
  useFileName,
  useFocusCommentIdState,
  useRoom,
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
  const [, setFocusCommentId] = useFocusCommentIdState();
  const { commentRefs } = React.useContext(CommentsContext);
  const [inProgressComments, setInProgressComments] = useRecoilState(
    inProgressCommentsSelector
  );
  const comments = useComments();
  const createComment = useCreateComment();
  const { extraOffset, offsets, scrollOffset } = useCommentOffsets();
  const { editorDivHeight, editorHeight } = useEditorHeight();
  const commentsPaneRef = React.useRef<HTMLElement>(null);
  useEditorScrollSync(commentsPaneRef, extraOffset, scrollOffset);

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
  };
  const createCommentFn = (comment: CommentData) => () => {
    setInProgressComments(
      inProgressComments.filter(({ id }) => comment.id !== id)
    );
    createComment && createComment(comment);
  };
  const cancelCommentFn = (commentId: string) => () => {
    setInProgressComments(
      inProgressComments.filter(({ id }) => id !== commentId)
    );
    delete commentRefs.current[commentId];
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
        {inProgressComments.map((comment) => (
          <li key={comment.id}>
            <AddComment
              offset={(offsets[comment.id] ?? 0) + extraOffset}
              id={comment.id}
              onSubmit={createCommentFn(comment)}
              onCancel={cancelCommentFn(comment.id)}
            />
          </li>
        ))}
      </ul>
      <CommentButton offset={extraOffset} onClick={addInProgressComment} />
    </section>
  );
};

const useCreateComment = () => {
  const settings = useRecoilValue(settingsSelector);
  const room = useRoom();
  const fileName = useFileName();
  if (!room) return;
  const yComments = getComments(room.id, room.password, fileName);
  if (!yComments) return;
  return (comment: CommentData) => {
    const now = new Date().toISOString();
    yComments.push([
      {
        ...comment,
        byId: settings.id,
        byName: settings.name,
        dateCreated: now,
        dateUpdated: now,
      },
    ]);
  };
};
