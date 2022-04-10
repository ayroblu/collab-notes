import React from "react";
import { VscComment } from "react-icons/vsc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { useIsMounted } from "@/hooks/useIsMounted";
import type { CommentData, SelectionRange } from "@/modules/documents";
import { cn, nonNullable } from "@/modules/utils";

import { EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  commentDrawerVisibleState,
  focusCommentIsActiveState,
  inProgressCommentsSelector,
  settingsSelector,
} from "../data-model";
import { useFileParams, useSetFocusCommentIdState } from "../utils";

import styles from "./CommentButton.module.css";

type CommentButtonProps = {
  offset: number;
};
export const CommentButton: React.FC<CommentButtonProps> = React.memo(
  ({ offset }) => {
    const showComment = useShowCommentButton();
    if (!showComment) return null;
    return <CommentButtonContent {...showComment} offset={offset} />;
  },
);
type ShowComment = {
  selection: SelectionRange;
  position: number;
};
const CommentButtonContent: React.FC<CommentButtonProps & ShowComment> = ({
  offset,
  position,
  selection,
}) => {
  const offsetTop = position + offset;
  const onClick = useOnClick();
  const handleClick = React.useCallback(() => {
    onClick(selection);
  }, [onClick, selection]);
  return (
    <button
      className={styles.commentButton}
      data-testid="CommentButton"
      onClick={handleClick}
      style={{
        top: offsetTop,
      }}
    >
      <VscComment />
    </button>
  );
};

type SimpleCommentButtonProps = {
  className?: string | undefined;
};
export const SimpleCommentButton: React.FC<SimpleCommentButtonProps> =
  React.memo(({ className }) => {
    const showComment = useShowCommentButton();
    if (!showComment) return null;
    return (
      <SimpleCommentButtonContent {...showComment} className={className} />
    );
  });
const SimpleCommentButtonContent: React.FC<
  ShowComment & SimpleCommentButtonProps
> = ({ className, selection }) => {
  const onClick = useOnClick();
  const handleClick = React.useCallback(() => {
    onClick(selection);
  }, [onClick, selection]);
  return (
    <button
      className={cn(styles.simpleCommentButton, className)}
      onClick={handleClick}
    >
      <VscComment />
    </button>
  );
};

const useShowCommentButton = () => {
  const { position, selection } = useSelectionPosition();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const focusCommentIsActive = useRecoilValue(
    focusCommentIsActiveState({ fileName, roomId }),
  );
  if (
    nonNullable(selection) &&
    nonNullable(position) &&
    !focusCommentIsActive
  ) {
    return { selection, position };
  }
  return null;
};
const useSelectionPosition = () => {
  const { editor } = React.useContext(EditorContext);
  const [position, setPosition] = React.useState<number | null>(null);
  const [selection, setSelection] = React.useState<SelectionRange | null>(null);
  const getIsMounted = useIsMounted();

  React.useEffect(() => {
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
        id: uuidv4(),
      };
      const top = editor.getTopForPosition(
        sel.startLineNumber,
        sel.startColumn,
      );
      const lineHeight = editor.getRawOptions().lineHeight || 24;
      setPosition(top + lineHeight / 2);
      setSelection(selection);
    });
    return () => {
      dispose();
    };
  }, [editor, getIsMounted]);
  return { position, selection };
};

const useOnClick = () => {
  const settings = useRecoilValue(settingsSelector);
  const setInProgressComments = useSetRecoilState(inProgressCommentsSelector);
  const setFocusCommentId = useSetFocusCommentIdState();
  const { fileName, roomId } = useFileParams();
  const setFocusCommentIsActive = useSetRecoilState(
    focusCommentIsActiveState({ fileName, roomId }),
  );
  const setIsCommentDrawerVisible = useSetRecoilState(
    commentDrawerVisibleState,
  );

  const addInProgressComment = React.useCallback(
    (selection: SelectionRange) => {
      const now = new Date().toISOString();
      const comment: CommentData = {
        selection,
        id: uuidv4(),
        byId: settings.id,
        byName: settings.name,
        dateCreated: now,
        dateUpdated: now,
        text: "",
      };
      setInProgressComments((inProgressComments) => [
        ...inProgressComments,
        comment,
      ]);
      setFocusCommentId(comment.id);
      setFocusCommentIsActive(true);
      setIsCommentDrawerVisible(true);
    },
    [
      setFocusCommentId,
      setFocusCommentIsActive,
      setInProgressComments,
      setIsCommentDrawerVisible,
      settings.id,
      settings.name,
    ],
  );
  return addInProgressComment;
};
