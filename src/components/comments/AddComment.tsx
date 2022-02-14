import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { inProgressCommentSelector, settingsSelector } from "../data-model";
import { Button, SubmitButton } from "../shared/Button";
import { useFileName } from "../utils";

import styles from "./AddComment.module.css";
import { CommentHolder } from "./Comment";
import { CommentHeading } from "./CommentEntryItem";

type AddCommentProps = {
  offset: number | undefined;
  onSubmit: () => void;
  onCancel: () => void;
  id: string;
  isFocusComment: boolean;
  isActiveComment: boolean;
};
export const AddComment: React.FC<AddCommentProps> = React.memo(
  ({ id, isActiveComment, isFocusComment, offset, onCancel, onSubmit }) => {
    const fileName = useFileName();
    const [comment, setComment] = useRecoilState(
      inProgressCommentSelector({ fileName, commentId: id }),
    );
    const settings = useRecoilValue(settingsSelector);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    };
    const handleCancel = () => {
      onCancel();
    };
    const onBlur = () => {
      if (!comment.text) {
        handleCancel();
      }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      const isCmd = e.getModifierState("Meta");
      const isCtrl = e.getModifierState("Ctrl");
      switch (e.key) {
        case "Enter":
          if (isCmd || isCtrl) {
            return onSubmit();
          }
      }
    };

    return (
      <CommentHolder
        id={id}
        offset={offset}
        selection={comment.selection}
        isFocusComment={isFocusComment}
        isActiveComment={isActiveComment}
      >
        <CommentHeading byName={settings.name} />
        <form onSubmit={handleSubmit} className={styles.main}>
          <textarea
            className={styles.textarea}
            value={comment.text}
            onChange={(e) =>
              setComment({ ...comment, text: e.currentTarget.value })
            }
            onKeyDown={handleKeyDown}
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
      </CommentHolder>
    );
  },
);
