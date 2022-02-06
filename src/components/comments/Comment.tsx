import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { addThread, editComment, removeComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  commentDidCreateState,
  focusCommentIsActiveState,
  inProgressCommentsSelector,
  settingsSelector,
} from "../data-model";
import {
  useComments,
  useFileName,
  useFileParams,
  useFocusCommentIdState,
  useRoom,
} from "../utils";

import styles from "./Comment.module.css";
import { CommentEntryItem } from "./CommentEntryItem";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";
import { CommentThread } from "./CommentThread";
import { getNearestCommentId } from "./utils";

type Props = CommentData & {
  offset: number | undefined;
};

export const Comment: React.FC<Props> = ({ offset, ...comment }) => {
  const { id } = comment;
  const [focusCommentId] = useFocusCommentIdState();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const [focusCommentIsActive] = useRecoilState(
    focusCommentIsActiveState({ fileName, roomId })
  );
  const isFocusComment = focusCommentId === id;
  const isActiveComment = focusCommentIsActive && isFocusComment;

  return (
    <CommentHolder {...comment} offset={offset}>
      <CommentMain {...comment} />
      <CommentThread commentId={id} />
      {isActiveComment && <div className={styles.ruledLine} />}
      {isActiveComment && <CommentAddThread commentId={id} />}
    </CommentHolder>
  );
};

type CommentHolderProps = {
  id: string;
  offset: number | undefined;
  selection: SelectionRange;
};
export const CommentHolder: React.FC<CommentHolderProps> = ({
  children,
  id,
  offset,
  selection,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();
  const setCommentDidCreate = useSetRecoilState(commentDidCreateState);
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const [focusCommentIsActive, setFocusCommentIsActive] = useRecoilState(
    focusCommentIsActiveState({ fileName, roomId })
  );
  const position = usePosition(selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : 0;
  const isFocusComment = focusCommentId === id;
  const isActiveComment = focusCommentIsActive && isFocusComment;
  const offsetLeft = isActiveComment ? "-32px" : "0";
  const handleRef = (r: HTMLElement | null) => {
    if (!r || typeof position !== "number") return;

    const old = commentRefs.current[id];
    const height = r.getBoundingClientRect().height;
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
      className={cn(styles.comment, focusCommentId === id && styles.focus)}
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

    const addThreadHandler = (text: string) => {
      if (!room) return false;
      return addThread({
        roomId: room.id,
        roomPassword: room.password,
        fileName,
        commentId,
        text,
        byId: settings.id,
        byName: settings.name,
      });
    };
    return (
      <section className={styles.addThread}>
        <CommentTextareaWithSave onSubmit={addThreadHandler} />
      </section>
    );
  }
);

const CommentMain: React.FC<CommentData> = React.memo(
  ({ byName, dateUpdated, id, text }) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const { commentRefs } = React.useContext(CommentsContext);
    const { fileName, roomId, roomPassword } = useFileParams();
    const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();
    const setFocusCommentIsActive = useSetRecoilState(
      focusCommentIsActiveState({ fileName, roomId })
    );
    const inProgressComments = useRecoilValue(inProgressCommentsSelector);
    const comments = useComments();

    const onEditSubmit = (text: string) => {
      editComment(roomId, roomPassword, fileName, id, text);
      setIsEdit(false);
      return false;
    };
    const onEditCancel = () => {
      setIsEdit(false);
    };
    const deleteComment = () => {
      const success = removeComment(roomId, roomPassword, fileName, id);
      if (!success) return;

      if (focusCommentId === id) {
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
    };
    const onEdit = () => {
      setIsEdit(true);
      setFocusCommentId(id);
      setFocusCommentIsActive(true);
    };
    const options = [
      { label: "Edit", onClick: onEdit },
      { label: "Delete", onClick: deleteComment },
    ];
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
  }
);

const usePosition = (selection: SelectionRange) => {
  const { editorRef } = React.useContext(EditorContext);

  const editor = editorRef.current;
  if (!editor) return;
  const top = editor.getTopForPosition(
    selection.startLineNumber,
    selection.startColumn
  );
  const lineHeight = editor.getRawOptions().lineHeight || 24;
  return top - lineHeight;
};
