import React from "react";
import { VscComment } from "react-icons/vsc";

import { useIsMounted } from "@/hooks/useIsMounted";

import { EditorContext } from "../Contexts";

import styles from "./CommentButton.module.css";
import type { SelectionRange } from "./types";

type CommentButtonProps = {
  onClick: (selection: SelectionRange) => void;
  offset: number;
};
export const CommentButton: React.FC<CommentButtonProps> = ({
  offset,
  onClick,
}) => {
  const { position, selection } = useShowCommentButton();
  const offsetTop = (position ?? 0) + offset;
  return (
    <button
      className={styles.commentButton}
      style={{
        top: offsetTop,
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
  const getIsMounted = useIsMounted();

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const { dispose: disposeBlur } = editor.onDidBlurEditorText(() => {
      setTimeout(() => {
        if (getIsMounted()) {
          setPosition(null);
          setSelection(null);
        }
      }, 100);
    });
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
      disposeBlur();
    };
  }, []);
  return { position, selection };
};
