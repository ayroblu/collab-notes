import type * as monaco from "monaco-editor";
import React from "react";

type EditorContext = {
  editorRef: React.MutableRefObject<
    monaco.editor.IStandaloneCodeEditor | undefined
  >;
  editorDivRef: React.RefObject<HTMLDivElement>;
};
export const EditorContext = React.createContext<EditorContext>({} as any);
type CommentsContext = {
  commentRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
};
export const CommentsContext = React.createContext<CommentsContext>({} as any);

export const Contexts: React.FC = ({ children }) => {
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const commentRefs = React.useRef<{ [key: string]: HTMLElement }>({});

  return (
    <EditorContext.Provider value={{ editorRef, editorDivRef }}>
      <CommentsContext.Provider value={{ commentRefs }}>
        {children}
      </CommentsContext.Provider>
    </EditorContext.Provider>
  );
};
