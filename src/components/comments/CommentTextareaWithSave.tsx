import React from "react";
import { useRecoilState } from "recoil";

import { showThreadSaveState } from "../data-model";
import { SubmitButton } from "../shared/Button";

import styles from "./CommentTextareaWithSave.module.css";

export const CommentTextareaWithSave: React.FC<{
  onSubmit: (text: string) => boolean;
  defaultText?: string;
  autoFocus?: boolean;
}> = ({ autoFocus, defaultText = "", onSubmit }) => {
  const [text, setText] = React.useState(defaultText);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [isShowSave, setShowSave] = useRecoilState(showThreadSaveState);

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
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={submitHandler}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Reply to comment"
        className={styles.textarea}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSave(true)}
        onBlur={() => setShowSave(false)}
        autoFocus={autoFocus}
      />
      {isShowSave && (
        <div className={styles.flexEnd}>
          <SubmitButton value="Save" disabled={!text} />
        </div>
      )}
    </form>
  );
};
