import React from "react";
import { VscComment } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getComments } from "@/modules/documents";

import { Button, SubmitButton } from "./Button";
import { Comment } from "./Comment";
import styles from "./CommentsPane.module.css";
import { CommentsContext, EditorContext, SettingsContext } from "./Contexts";

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

type CommentButtonProps = {
  onClick: (selection: SelectionRange) => void;
};
const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {
  const { position, selection } = useShowCommentButton();
  return (
    <button
      className={styles.commentButton}
      style={{
        insetBlockStart: position ?? undefined,
        display: position === null ? "none" : undefined,
      }}
      onClick={() => selection && onClick(selection)}
    >
      <VscComment />
    </button>
  );
};

const useShowCommentButton = () => {
  const { editorRef } = React.useContext(EditorContext);
  const [position, setPosition] = React.useState<number | null>(null);
  const [selection, setSelection] = React.useState<SelectionRange | null>(null);
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
        setSelection(null);
        return;
      }
      const selection = {
        startLineNumber: sel.startLineNumber,
        endLineNumber: sel.endLineNumber,
        startColumn: sel.startColumn,
        endColumn: sel.endColumn,
      };
      const top = editor.getTopForPosition(
        sel.startLineNumber,
        sel.startColumn
      );
      const lineHeight = editor.getRawOptions().lineHeight || 24;
      setPosition(top + lineHeight / 2);
      setSelection(selection);
    });
    return () => {
      dispose();
    };
  }, []);
  return { position, selection };
};

type AddCommentProps = {
  onSubmit: (text: string) => void;
  onCancel: () => void;
};
const AddComment: React.FC<AddCommentProps> = ({ onCancel, onSubmit }) => {
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
export type SelectionRange = {
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};
