import React from "react";
import { VscClose } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";

import { getComments } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, getHashColor, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext, SettingsContext } from "../Contexts";
import { FacePileFace } from "../shared/FacePile";

import styles from "./Comment.module.css";

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
  const { commentRefs, focusCommentId, setFocusCommentId } =
    React.useContext(CommentsContext);
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const position = usePosition(selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : undefined;

  const deleteComment = () => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
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
    </section>
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
  return top - 12;
};
