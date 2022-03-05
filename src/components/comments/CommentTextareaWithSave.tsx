import React from "react";

import { handleTextAreaHeight } from "@/modules/utils";

import { Button, SubmitButton } from "../shared/Button";

import styles from "./CommentTextareaWithSave.module.css";

export const CommentTextareaWithSave: React.FC<{
  onSubmit: (text: string) => boolean;
  defaultText?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
}> = ({ autoFocus, defaultText = "", onCancel, onSubmit }) => {
  const [text, setText] = React.useState(defaultText);
  const [textAreaKey, setTextAreaKey] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleCancel = () => {
    setText("");
    textareaRef.current?.blur();
    setTextAreaKey((v) => ++v);
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
    switch (e.key) {
      case "Enter":
        if (e.metaKey || e.ctrlKey) {
          handleSubmit();
        }
    }
  };
  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    );
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const dispose = handleTextAreaHeight(textarea);
    return () => {
      dispose();
    };
  }, []);
  return (
    <form onSubmit={submitHandler}>
      <textarea
        autoFocus={autoFocus}
        className={styles.textarea}
        key={textAreaKey}
        onChange={(e) => setText(e.currentTarget.value)}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        placeholder="Reply to comment"
        ref={textareaRef}
        value={text}
      />
      <div className={styles.flexEnd}>
        <SubmitButton disabled={!text} value="Save" />
        <Button buttonType="form" disabled={!text} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
