import React from "react";

import { Button, SubmitButton } from "../shared/Button";

import styles from "./CommentTextareaWithSave.module.css";

export const CommentTextareaWithSave: React.FC<{
  onSubmit: (text: string) => boolean;
  defaultText?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
}> = ({ autoFocus, defaultText = "", onCancel, onSubmit }) => {
  const [text, setText] = React.useState(defaultText);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleCancel = () => {
    setText("");
    textareaRef.current?.blur();
    onCancel?.();
  };
  const handleSubmit = () => {
    const isSuccess = onSubmit(text);
    if (isSuccess) {
      setText("");
      textareaRef.current?.blur();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const isCmd = e.getModifierState("Meta");
    const isCtrl = e.getModifierState("Ctrl");
    switch (e.key) {
      case "Enter":
        if (isCmd || isCtrl) {
          handleSubmit();
        }
    }
  };
  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = `${getTextareaHeight(textarea.scrollHeight)}px`;
    textarea.addEventListener("input", () => {
      // textarea.style.height = "auto";
      textarea.style.height = `${getTextareaHeight(textarea.scrollHeight)}px`;
    });
  }, []);
  return (
    <form onSubmit={submitHandler}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Reply to comment"
        className={styles.textarea}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        autoFocus={autoFocus}
      />
      <div className={styles.flexEnd}>
        <SubmitButton value="Save" disabled={!text} />
        <Button buttonType="form" disabled={!text} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

function getTextareaHeight(scrollHeight: number) {
  const maxHeight = window.innerHeight;
  const lineHeight = 1.15 * 20;
  const minTextareaHeight = lineHeight * 2 + 8;
  return Math.max(Math.min(maxHeight, scrollHeight), minTextareaHeight);
}