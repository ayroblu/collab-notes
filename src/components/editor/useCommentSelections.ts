import * as monaco from "monaco-editor";
import React from "react";
import { useRecoilValue } from "recoil";

import { cn } from "@/modules/utils";

import { EditorContext } from "../Contexts";
import { inProgressCommentsSelector } from "../data-model";
import { useComments } from "../utils";

import styles from "./useCommentSelections.module.css";

export const useCommentSelections = () => {
  const { editorRef } = React.useContext(EditorContext);
  const comments = useComments();
  const inProgressComments = useRecoilValue(inProgressCommentsSelector);
  const [, setDecorations] = React.useState<string[]>([]);
  React.useEffect(() => {
    const newDecorations = [
      ...comments.map(
        ({
          id,
          selection: { endColumn, endLineNumber, startColumn, startLineNumber },
          text,
        }) => ({
          range: new monaco.Range(
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn
          ),
          options: {
            // inlineClassName: cn(styles.selection, `comment-${id}`),
            className: cn(styles.selection, `comment-${id}`),
            hoverMessage: { value: text },
          },
        })
      ),
      ...inProgressComments.map(
        ({
          id,
          selection: { endColumn, endLineNumber, startColumn, startLineNumber },
        }) => ({
          range: new monaco.Range(
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn
          ),
          options: {
            className: cn(styles.selection, `comment-${id}`),
          },
        })
      ),
    ];
    const editor = editorRef.current;
    if (!editor) return;
    setDecorations((decorations) => {
      console.log(decorations, newDecorations);
      console.log("lineDecorations", editor.getLineDecorations(1));
      return editor.deltaDecorations(decorations, newDecorations);
    });
  }, [inProgressComments, comments, editorRef]);
};
