import React from "react";
import { VscClose } from "react-icons/vsc";
import { useRecoilState, useRecoilValue } from "recoil";

import { getComments, getThread } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, getHashColor, nonNullable, uuidv4 } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import { settingsSelector, showThreadSaveState } from "../data-model";
import { SubmitButton } from "../shared/Button";
import { FacePileFace } from "../shared/FacePile";
import { useFileName, useFocusCommentIdState, useRoom } from "../utils";

import styles from "./Comment.module.css";
import { useThreadValue } from "./useThread";

type Props = CommentData & {
  offset: number | undefined;
};

export const Comment: React.FC<Props> = ({
  byName,
  id,
  offset,
  selection,
  text,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();
  const position = usePosition(selection);
  const room = useRoom();
  const fileName = useFileName();
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : undefined;

  const deleteComment = () => {
    if (!room) return;
    if (!fileName) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;
    const index = yComments.toArray().findIndex((comment) => comment.id === id);
    if (index === -1) return;

    yComments.delete(index);
    if (focusCommentId === id) {
      setFocusCommentId(null);
    }
    delete commentRefs.current[id];
  };
  const isFocusComment = focusCommentId === id;
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
      className={cn(styles.comment, focusCommentId === id && styles.focus)}
      style={{
        transform: `translateY(${offsetTop}px)`,
        display: !nonNullable(position) ? "none" : undefined,
      }}
      onClick={() => setFocusCommentId(id)}
    >
      <div className={styles.userHeading}>
        <FacePileFace color={getHashColor(byName)} name={byName} />
        <h4 className={styles.userNameHeading}>{byName}</h4>
      </div>
      <p className={styles.text}>{text}</p>
      <button className={styles.close} onClick={deleteComment}>
        <VscClose />
      </button>
      <CommentThread commentId={id} />
      {isFocusComment && <div className={styles.ruledLine} />}
      {isFocusComment && <CommentAddThread commentId={id} />}
    </section>
  );
};

const CommentAddThread: React.FC<{ commentId: string }> = ({ commentId }) => {
  const [text, setText] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const room = useRoom();
  const fileName = useFileName();
  const settings = useRecoilValue(settingsSelector);
  const [isShowThreadSave, setShowThreadSave] =
    useRecoilState(showThreadSaveState);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const isCmd = e.getModifierState("Meta");
    const isCtrl = e.getModifierState("Ctrl");
    switch (e.key) {
      case "Enter":
        if (isCmd || isCtrl) {
          return addThread();
        }
    }
  };
  const addThread = () => {
    if (!room) return;
    const thread = getThread(room.id, room.password, fileName, commentId);
    if (text && thread) {
      const now = new Date().toISOString();
      thread.push([
        {
          id: uuidv4(),
          commentId,
          text,
          byId: settings.id,
          byName: settings.name,
          dateCreated: now,
          dateUpdated: now,
        },
      ]);
      setText("");
      textareaRef.current?.blur();
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addThread();
  };
  return (
    <form onSubmit={onSubmit}>
      <section className={styles.addThread}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="Reply to comment"
          className={styles.textarea}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowThreadSave(true)}
          onBlur={() => setShowThreadSave(false)}
        />
        {isShowThreadSave && (
          <div className={styles.flexEnd}>
            <SubmitButton value="Save" disabled={!text} />
          </div>
        )}
      </section>
    </form>
  );
};

const CommentThread: React.FC<{ commentId: string }> = ({ commentId }) => {
  const thread = useThreadValue(commentId);
  return (
    <>
      {thread.map(({ byName, id, text }) => (
        <section className={styles.thread} key={id}>
          <div className={styles.userHeading}>
            <FacePileFace color={getHashColor(byName)} name={byName} />
            <h4 className={styles.userNameHeading}>{byName}</h4>
          </div>
          <p className={styles.text}>{text}</p>
        </section>
      ))}
    </>
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
