import type * as monaco from "monaco-editor";
import React from "react";

type EditorContext = {
  editor: monaco.editor.IStandaloneCodeEditor | null;
  setEditor: React.Dispatch<
    React.SetStateAction<monaco.editor.IStandaloneCodeEditor | null>
  >;
  editorDivRef: React.RefObject<HTMLDivElement>;
};
export const EditorContext = React.createContext<EditorContext>({} as any);
type CommentsContext = {
  commentRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
};
export const CommentsContext = React.createContext<CommentsContext>({} as any);

export const Contexts: React.FC = ({ children }) => {
  const [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const commentRefs = React.useRef<{ [key: string]: HTMLElement }>({});

  return (
    <EditorContext.Provider value={{ editor, setEditor, editorDivRef }}>
      <CommentsContext.Provider value={{ commentRefs }}>
        {children}
      </CommentsContext.Provider>
    </EditorContext.Provider>
  );
};
