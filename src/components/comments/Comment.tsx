import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { addThread, editComment, removeComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  commentDidCreateState,
  editorDidCreateState,
  focusCommentIsActiveState,
  inProgressCommentsSelector,
  settingsSelector,
} from "../data-model";
import {
  useComments,
  useFileName,
  useFileParams,
  useRoom,
  useSetFocusCommentIdState,
} from "../utils";

import styles from "./Comment.module.css";
import { CommentEntryItem } from "./CommentEntryItem";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";
import { CommentThread } from "./CommentThread";
import { getNearestCommentId } from "./utils";

type Props = CommentData & {
  offset: number | undefined;
  isFocusComment: boolean;
  isActiveComment: boolean;
};

export const Comment: React.FC<Props> = React.memo(
  ({ isActiveComment, isFocusComment, offset, ...comment }) => {
    const { id } = comment;

    return (
      <CommentHolder
        {...comment}
        offset={offset}
        isFocusComment={isFocusComment}
        isActiveComment={isActiveComment}
      >
        <CommentMain {...comment} isFocusComment={isFocusComment} />
        <CommentThread commentId={id} />
        {isActiveComment && <div className={styles.ruledLine} />}
        {isActiveComment && <CommentAddThread commentId={id} />}
      </CommentHolder>
    );
  }
);

type CommentHolderProps = {
  id: string;
  offset: number | undefined;
  selection: SelectionRange;
  isFocusComment: boolean;
  isActiveComment: boolean;
};
export const CommentHolder: React.FC<CommentHolderProps> = ({
  children,
  id,
  isActiveComment,
  isFocusComment,
  offset,
  selection,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const setFocusCommentId = useSetFocusCommentIdState();
  const setCommentDidCreate = useSetRecoilState(commentDidCreateState);
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const setFocusCommentIsActive = useSetRecoilState(
    focusCommentIsActiveState({ fileName, roomId })
  );
  const position = usePosition(selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : 0;
  const offsetLeft = isActiveComment ? "-32px" : "0";
  const handleRef = (r: HTMLElement | null) => {
    if (!r || typeof position !== "number") return;

    const old = commentRefs.current[id];
    const height = r.offsetHeight;
    commentRefs.current[id] = {
      el: r,
      top: position,
      height,
    };
    if (!old || old.height !== height) {
      setCommentDidCreate({});
    }
  };

  return (
    <section
      ref={handleRef}
      className={cn(styles.comment, isFocusComment && styles.focus)}
      style={{
        transform: `translate(${offsetLeft}, ${offsetTop}px)`,
        display: !nonNullable(position) ? "none" : undefined,
      }}
      onClick={() => {
        setFocusCommentId(id);
        setFocusCommentIsActive(true);
      }}
    >
      {children}
    </section>
  );
};

const CommentAddThread: React.FC<{ commentId: string }> = React.memo(
  ({ commentId }) => {
    const room = useRoom();
    const fileName = useFileName();
    const settings = useRecoilValue(settingsSelector);

    const addThreadHandler = (text: string) =>
      addThread({
        roomId: room.id,
        roomPassword: room.password,
        fileName,
        commentId,
        text,
        byId: settings.id,
        byName: settings.name,
      });
    return (
      <section className={styles.addThread}>
        <CommentTextareaWithSave onSubmit={addThreadHandler} />
      </section>
    );
  }
);

const CommentMain: React.FC<CommentData & { isFocusComment: boolean }> =
  React.memo(({ byName, dateUpdated, id, isFocusComment, text }) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const { commentRefs } = React.useContext(CommentsContext);
    const { fileName, roomId, roomPassword } = useFileParams();
    const setFocusCommentId = useSetFocusCommentIdState();
    const setFocusCommentIsActive = useSetRecoilState(
      focusCommentIsActiveState({ fileName, roomId })
    );
    const inProgressComments = useRecoilValue(inProgressCommentsSelector);
    const comments = useComments();

    const onEditSubmit = React.useCallback(
      (text: string) => {
        editComment(roomId, roomPassword, fileName, id, text);
        setIsEdit(false);
        return false;
      },
      [fileName, id, roomId, roomPassword]
    );
    const onEditCancel = React.useCallback(() => {
      setIsEdit(false);
    }, []);
    const deleteComment = React.useCallback(() => {
      const success = removeComment(roomId, roomPassword, fileName, id);
      if (!success) return;

      if (isFocusComment) {
        setFocusCommentId(
          getNearestCommentId(
            commentRefs.current,
            comments.concat(inProgressComments).map(({ id }) => id),
            id
          )
        );
        setFocusCommentIsActive(false);
      }
      delete commentRefs.current[id];
    }, [
      commentRefs,
      comments,
      fileName,
      id,
      inProgressComments,
      isFocusComment,
      roomId,
      roomPassword,
      setFocusCommentId,
      setFocusCommentIsActive,
    ]);
    const onEdit = React.useCallback(() => {
      setIsEdit(true);
      setFocusCommentId(id);
      setFocusCommentIsActive(true);
    }, [id, setFocusCommentId, setFocusCommentIsActive]);
    const options = React.useMemo(
      () => [
        { label: "Edit", onClick: onEdit },
        { label: "Delete", onClick: deleteComment },
      ],
      [deleteComment, onEdit]
    );
    return (
      <CommentEntryItem
        byName={byName}
        options={options}
        text={text}
        dateUpdated={dateUpdated}
        isEdit={isEdit}
        onEditSubmit={onEditSubmit}
        onEditCancel={onEditCancel}
      />
    );
  });

const usePosition = (selection: SelectionRange) => {
  const { editorDivRef, editorRef } = React.useContext(EditorContext);
  useRecoilValue(editorDidCreateState);

  const editor = editorRef.current;
  if (!editor) return;
  const editorDiv = editorDivRef.current;
  if (!editorDiv) return;
  // TODO: Why does -1 make this work? Removing it causes the scroll sync to fail
  const editorTop = editorDiv.offsetTop - 1;
  const top = editor.getTopForPosition(
    selection.startLineNumber,
    selection.startColumn
  );
  const lineHeight = editor.getRawOptions().lineHeight || 24;
  return top - lineHeight - editorTop;
};
