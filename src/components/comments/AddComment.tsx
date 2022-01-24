import React from "react";

import { Button, SubmitButton } from "../shared/Button";

import styles from "./AddComment.module.css";

type AddCommentProps = {
  onSubmit: (text: string) => void;
  onCancel: () => void;
};
export const AddComment: React.FC<AddCommentProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [commentText, setCommentText] = React.useState("");
  const handleSubmit = () => {
    console.log("submit");
    onSubmit(commentText);
  };
  const handleCancel = () => {
    console.log("cancel");
    onCancel();
  };
  return (
    <section className={styles.addComment}>
      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={commentText}
          onChange={(e) => setCommentText(e.currentTarget.value)}
        />
        <div className={styles.flexEnd}>
          <SubmitButton value="Save" disabled={!commentText} />
          <Button buttonType="form" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};
