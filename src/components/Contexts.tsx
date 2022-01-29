import type * as monaco from "monaco-editor";
import React, { Suspense } from "react";

import { SetupSync } from "./Sync";
import { ErrorBoundary } from "./shared/ErrorBoundary";
import { Spinner } from "./shared/Spinner";

type EditorContext = {
  editorRef: React.MutableRefObject<
    monaco.editor.IStandaloneCodeEditor | undefined
  >;
  editorDivRef: React.RefObject<HTMLDivElement>;
};
export const EditorContext = React.createContext<EditorContext>({} as any);
type CommentsContext = {
  commentRefs: React.MutableRefObject<{ [key: string]: CommentLayout }>;
};
type CommentLayout = {
  el: HTMLElement;
  height: number;
  top: number;
};
export const CommentsContext = React.createContext<CommentsContext>({} as any);

export const Contexts: React.FC = ({ children }) => {
  // const [settings, setSettingsState] = React.useState(defaultSettings);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const commentRefs = React.useRef<{ [key: string]: CommentLayout }>({});

  // const setSettings = React.useCallback(async (settings: Settings) => {
  //   setSettingsState(settings);
  //   await set(dbKey, settings);
  //   broadcastUpdate();
  // }, []);
  // const setSettingsLocal = React.useCallback((settings: Settings) => {
  //   setSettingsState(settings);
  //   set(dbKey, settings);
  // }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <EditorContext.Provider value={{ editorRef, editorDivRef }}>
          <CommentsContext.Provider value={{ commentRefs }}>
            <SetupSync>{children}</SetupSync>
          </CommentsContext.Provider>
        </EditorContext.Provider>
      </Suspense>
    </ErrorBoundary>
  );
};
