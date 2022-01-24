import React from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getComments } from "@/modules/documents";

import { CommentsContext, SettingsContext } from "../Contexts";

import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { CommentButton } from "./CommentButton";
import styles from "./CommentsPane.module.css";
import type { SelectionRange } from "./types";

export const CommentsPane: React.FC = () => {
  const [inProgressSelections, setInProgressSelections] = React.useState<
    SelectionRange[]
  >([]);
  const comments = useCommentsSync();
  const createComment = useCreateComment();
  const createCommentFn =
    (selection: SelectionRange, index: number) => (text: string) => {
      setInProgressSelections(
        inProgressSelections.filter((_, i) => i !== index)
      );
      text && createComment && createComment(text, selection);
    };
  const cancelCommentFn = (index: number) => () => {
    setInProgressSelections(inProgressSelections.filter((_, i) => i !== index));
  };
  return (
    <section className={styles.commentsPane}>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment {...comment} />
          </li>
        ))}
        {inProgressSelections.map((sel, i) => (
          <li key={JSON.stringify(sel)}>
            <AddComment
              onSubmit={createCommentFn(sel, i)}
              onCancel={cancelCommentFn(i)}
            />
          </li>
        ))}
      </ul>
      <CommentButton
        onClick={(selection) =>
          setInProgressSelections([...inProgressSelections, selection])
        }
      />
    </section>
  );
};

const useCommentsSync = () => {
  const { settings } = React.useContext(SettingsContext);
  const { comments, setComments } = React.useContext(CommentsContext);
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

const useCreateComment = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  if (!room) return;
  if (!fileName) return;
  const yComments = getComments(room.id, room.password, fileName);
  if (!yComments) return;
  return (text: string, selection: SelectionRange) => {
    const now = new Date().toISOString();
    yComments.push([
      {
        id: uuidv4(),
        text,
        byId: settings.id,
        byName: settings.name,
        dateCreated: now,
        dateUpdated: now,
        ...selection,
      },
    ]);
  };
};
