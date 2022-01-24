import React from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getComments } from "@/modules/documents";
import { sortBy } from "@/modules/utils";

import { CommentsContext, EditorContext, SettingsContext } from "../Contexts";

import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { CommentButton } from "./CommentButton";
import styles from "./CommentsPane.module.css";
import type { SelectionRange } from "./types";

export const CommentsPane: React.FC = () => {
  const [inProgressSelections, setInProgressSelections] = React.useState<
    SelectionRange[]
  >([]);
  const { editorDivRef } = React.useContext(EditorContext);
  const comments = useCommentsSync();
  const createComment = useCreateComment();
  const offsets = useCommentOffsets();
  const editorHeight = useEditorHeight();
  const commentsPaneRef = React.useRef<HTMLElement>(null);
  useEditorScrollSync(commentsPaneRef);

  const editorDivHeight = editorDivRef.current
    ? editorDivRef.current.getBoundingClientRect().height
    : undefined;
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
    <section
      className={styles.commentsPane}
      style={{ height: editorDivHeight }}
      ref={commentsPaneRef}
    >
      <ul style={{ height: editorHeight }}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment offset={offsets[comment.id]} {...comment} />
          </li>
        ))}
        {inProgressSelections.map((sel, i) => (
          <li key={JSON.stringify(sel)}>
            <AddComment
              selection={sel}
              offset={offsets[`add-comment-${i}`]}
              id={`add-comment-${i}`}
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

const commentGap = 8;
const useCommentOffsets = () => {
  const { commentRefs, comments, focusCommentId } =
    React.useContext(CommentsContext);
  const [offsets, setOffsets] = React.useState<{ [key: string]: number }>({});
  React.useEffect(() => {
    const commentDetails = Object.entries(commentRefs.current)
      .map(([id, { el, height, top }]) => {
        return { id, el, top, height };
      })
      .sort(sortBy([({ top }) => top], ["asc"]));
    if (commentDetails.length < 2) return;
    function getFocusCommentIndex() {
      if (typeof focusCommentId === "string") {
        const index = commentDetails.findIndex(
          ({ id }) => id === focusCommentId
        );
        if (index === -1) return 0;
        return index;
      } else {
        return 0;
      }
    }
    const newOffsets: { [key: string]: number } = {};
    const focusCommentIndex = getFocusCommentIndex();
    for (let i = focusCommentIndex - 1; i >= 0; --i) {
      const belowComment = commentDetails[i + 1]!;
      const comment = commentDetails[i]!;
      const commentBottom = comment.top + comment.height + commentGap;
      if (commentBottom > belowComment.top) {
        newOffsets[comment.id] = -(commentBottom - belowComment.top);
      }
    }
    for (let i = focusCommentIndex + 1; i < commentDetails.length; ++i) {
      const aboveComment = commentDetails[i - 1]!;
      const comment = commentDetails[i]!;
      const aboveCommentBottom =
        aboveComment.top + aboveComment.height + commentGap;
      if (aboveCommentBottom > comment.top) {
        newOffsets[comment.id] = aboveCommentBottom - comment.top;
      }
    }
    setOffsets(newOffsets);
  }, [comments]);
  return offsets;
};

const useEditorHeight = () => {
  const { editorRef } = React.useContext(EditorContext);
  const editor = editorRef.current;
  if (!editor) return;
  return editor.getContentHeight();
};
const useEditorScrollSync = (commentsPaneRef: React.RefObject<HTMLElement>) => {
  const { editorRef } = React.useContext(EditorContext);
  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const commentsPane = commentsPaneRef.current;
    if (!commentsPane) return;

    console.log("hi");
    const { dispose } = editor.onDidScrollChange((e) => {
      console.log("scroll!!");
      commentsPane.scrollTop = e.scrollTop;
    });
    return () => {
      dispose();
    };
  }, []);
};
