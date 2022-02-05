import React from "react";
import { useRecoilValue } from "recoil";

import { addThread, editComment, removeComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  focusCommentIsActiveState,
  settingsSelector,
} from "../data-model";
import {
  useFileName,
  useFileParams,
  useFocusCommentIdState,
  useRoom,
} from "../utils";

import styles from "./Comment.module.css";
import { CommentEntryItem } from "./CommentEntryItem";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";
import { CommentThread } from "./CommentThread";

type Props = CommentData & {
  offset: number | undefined;
};

export const Comment: React.FC<Props> = (comment) => {
  const { id, offset, selection } = comment;
  const { commentRefs } = React.useContext(CommentsContext);
  const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const focusCommentIsActive = useRecoilValue(
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
  const offsetLeft = focusCommentIsActive && isFocusComment ? "-32px" : "0";

  return (
    <section
      ref={(r) =>
        r &&
        typeof position === "number" &&
        (commentRefs.current[id] = {
          el: r,
          top: position,
          height: r.getBoundingClientRect().height,
        })
      }
      className={cn(
        styles.comment,
        focusCommentId === id && styles.focus,
        focusCommentIsActive && styles.active
      )}
      style={{
        transform: `translate(${offsetLeft}, ${offsetTop}px)`,
        display: !nonNullable(position) ? "none" : undefined,
      }}
      onClick={() => setFocusCommentId(id)}
    >
      <CommentMain {...comment} />
      <CommentThread commentId={id} />
      {isFocusComment && <div className={styles.ruledLine} />}
      {isFocusComment && <CommentAddThread commentId={id} />}
    </section>
  );
};

const CommentAddThread: React.FC<{ commentId: string }> = ({ commentId }) => {
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
};

const CommentMain: React.FC<CommentData> = ({
  byName,
  dateUpdated,
  id,
  text,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const { commentRefs } = React.useContext(CommentsContext);
  const { fileName, roomId, roomPassword } = useFileParams();
  const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();

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
      setFocusCommentId(null);
    }
    delete commentRefs.current[id];
  };
  const onEdit = () => {
    setIsEdit(true);
    setFocusCommentId(id);
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
};

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
