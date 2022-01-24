import React from "react";

import type { CommentData } from "@/modules/documents/types";
import { getRandomColor } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import { FacePileFace } from "../shared/FacePile";

import styles from "./Comment.module.css";
import type { SelectionRange } from "./types";

type Props = CommentData;

export const Comment: React.FC<Props> = ({
  byName,
  endColumn,
  endLineNumber,
  id,
  startColumn,
  startLineNumber,
  text,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const selection = {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
  };
  const position = usePosition(selection);
  return (
    <section
      ref={(r) => r && (commentRefs.current[id] = r)}
      className={styles.comment}
      style={{
        insetBlockStart: position ?? undefined,
        display: position === null ? "none" : undefined,
      }}
    >
      <div className={styles.userHeading}>
        <FacePileFace color={getRandomColor()} name={byName} />
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
  const lineHeight = editor.getRawOptions().lineHeight || 24;
  return top + lineHeight / 2;
};
