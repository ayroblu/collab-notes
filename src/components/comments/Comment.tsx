import React from "react";

import type { CommentData } from "@/modules/documents/types";
import { cn, getHashColor, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import { FacePileFace } from "../shared/FacePile";

import styles from "./Comment.module.css";
import type { SelectionRange } from "./types";

type Props = CommentData & {
  offset: number | undefined;
};

export const Comment: React.FC<Props> = ({
  byName,
  endColumn,
  endLineNumber,
  id,
  offset,
  startColumn,
  startLineNumber,
  text,
}) => {
  const { commentRefs, focusCommentId, setFocusCommentId } =
    React.useContext(CommentsContext);
  const selection = {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
  };
  const position = usePosition(selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : undefined;
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
