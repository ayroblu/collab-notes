import React from "react";
import { useRecoilState } from "recoil";

import type { SelectionRange } from "@/modules/documents";
import { cn, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import { inProgressCommentSelector } from "../data-model";
import { Button, SubmitButton } from "../shared/Button";
import { useFileName, useFocusCommentIdState } from "../utils";

import styles from "./AddComment.module.css";

type AddCommentProps = {
  offset: number | undefined;
  onSubmit: () => void;
  onCancel: () => void;
  id: string;
};
export const AddComment: React.FC<AddCommentProps> = ({
  id,
  offset,
  onCancel,
  onSubmit,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const [focusCommentId, setFocusCommentId] = useFocusCommentIdState();
  const fileName = useFileName();
  const [comment, setComment] = useRecoilState(
    inProgressCommentSelector({ fileName, commentId: id })
  );
  const handleSubmit = () => {
    onSubmit();
  };
  const handleCancel = () => {
    onCancel();
  };
  const position = usePosition(comment.selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : undefined;

  const onBlur = () => {
    if (!comment.text) {
      handleCancel();
    }
  };

  return (
    <section
      className={cn(styles.addComment, focusCommentId === id && styles.focus)}
      ref={(r) =>
        r &&
        typeof position === "number" &&
        (commentRefs.current[id] = {
          el: r,
          top: position,
          height: r.getBoundingClientRect().height,
        })
      }
      style={{
        transform: `translateY(${offsetTop}px)`,
        display: !nonNullable(position) ? "none" : undefined,
      }}
      onClick={() => setFocusCommentId(id)}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={comment.text}
          onChange={(e) =>
            setComment({ ...comment, text: e.currentTarget.value })
          }
          onBlur={onBlur}
          autoFocus
        />
        <div className={styles.flexEnd}>
          <SubmitButton value="Save" disabled={!comment.text} />
          <Button buttonType="form" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
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
