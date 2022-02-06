import React from "react";

import { editThread, removeThread } from "@/modules/documents";
import type { ThreadData } from "@/modules/documents/types";

import { useFileParams } from "../utils";

import { CommentEntryItem } from "./CommentEntryItem";
import styles from "./CommentThread.module.css";
import { useThreadValue } from "./useThread";

export const CommentThread: React.FC<{ commentId: string }> = React.memo(
  ({ commentId }) => {
    const thread = useThreadValue(commentId);
    return (
      <>
        {thread.map((thread) => (
          <section key={thread.id} className={styles.thread}>
            <ThreadItem {...thread} />
          </section>
        ))}
      </>
    );
  }
);

const ThreadItem: React.FC<ThreadData> = ({
  byName,
  commentId,
  dateUpdated,
  id,
  text,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const { fileName, roomId, roomPassword } = useFileParams();

  const onEditCancel = () => {
    setIsEdit(false);
  };
  const onEditSubmit = (text: string) => {
    editThread({
      roomId,
      roomPassword,
      fileName,
      commentId,
      threadId: id,
      text,
    });
    setIsEdit(false);
    return false;
  };
  const options = [
    { label: "Edit", onClick: () => setIsEdit(true) },
    {
      label: "Delete",
      onClick: () =>
        removeThread({
          threadId: id,
          commentId,
          fileName,
          roomPassword,
          roomId,
        }),
    },
  ];
  return (
    <CommentEntryItem
      byName={byName}
      dateUpdated={dateUpdated}
      text={text}
      options={options}
      isEdit={isEdit}
      onEditSubmit={onEditSubmit}
      onEditCancel={onEditCancel}
    />
  );
};
