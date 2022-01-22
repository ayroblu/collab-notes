import React from "react";
import { useSearchParams } from "react-router-dom";

import type { CommentData } from "@/modules/documents";
import { getComments } from "@/modules/documents";

import { Comment } from "./Comment";
import styles from "./CommentsPane.module.css";
import { SettingsContext } from "./Contexts";

export const CommentsPane: React.FC = () => {
  const comments = useComments();
  return (
    <section className={styles.commentsPane}>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
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
