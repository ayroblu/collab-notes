import React from "react";
import { VscComment } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { useIsMounted } from "@/hooks/useIsMounted";
import type { SelectionRange } from "@/modules/documents";
import { nonNullable } from "@/modules/utils";

import { EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  focusCommentIsActiveState,
} from "../data-model";

import styles from "./CommentButton.module.css";

type CommentButtonProps = {
  onClick: (selection: SelectionRange) => void;
  offset: number;
};
export const CommentButton: React.FC<CommentButtonProps> = React.memo(
  ({ offset, onClick }) => {
    const showComment = useShowCommentButton();
    if (!showComment) return null;
    const { position, selection } = showComment;

    const offsetTop = position + offset;
    return (
      <button
        className={styles.commentButton}
        data-testid="CommentButton"
        onClick={() => onClick(selection)}
        style={{
          top: offsetTop,
        }}
      >
        <VscComment />
      </button>
    );
  },
);

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
