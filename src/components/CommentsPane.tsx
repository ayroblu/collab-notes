import React from "react";
import { VscComment } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";

import type { CommentData } from "@/modules/documents";
import { getComments } from "@/modules/documents";

import { Comment } from "./Comment";
import styles from "./CommentsPane.module.css";
import { EditorContext, SettingsContext } from "./Contexts";

export const CommentsPane: React.FC = () => {
  const comments = useComments();
  return (
    <section className={styles.commentsPane}>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment {...comment} />
          </li>
        ))}
      </ul>
      <CommentButton />
    </section>
  );
};

const useComments = () => {
  const { settings } = React.useContext(SettingsContext);
  const [comments, setComments] = React.useState<CommentData[]>([]);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  React.useEffect(() => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    if (!fileName) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;
    setComments(yComments.toArray());

    const changeListener = () => {
      setComments(yComments.toArray());
    };
    yComments.observe(changeListener);
    return () => {
      yComments.unobserve(changeListener);
    };
  }, [settings.activeRoomId]);

  return comments;
};

const CommentButton = () => {
  const position = useShowCommentButton();
  return (
    <button
      className={styles.commentButton}
      style={{
        insetBlockStart: position ?? undefined,
        display: position === null ? "none" : undefined,
      }}
    >
      <VscComment />
    </button>
  );
};

const useShowCommentButton = () => {
  const { editorRef } = React.useContext(EditorContext);
  const [position, setPosition] = React.useState<number | null>(null);
  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const { dispose } = editor.onDidChangeCursorSelection((e) => {
      const sel = e.selection;
      if (
        sel.selectionStartLineNumber === sel.positionLineNumber &&
        sel.selectionStartColumn === sel.positionColumn
      ) {
        setPosition(null);
        return;
      }
      const top = editor.getTopForPosition(
        sel.startLineNumber,
        sel.startColumn
      );
      const lineHeight = editor.getRawOptions().lineHeight || 24;
      setPosition(top + lineHeight / 2);
    });
    return () => {
      dispose();
    };
  }, []);
  return position;
};
