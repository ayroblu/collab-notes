import * as monaco from "monaco-editor";
import { initVimMode, VimMode } from "monaco-vim";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MonacoBinding } from "y-monaco";
import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useStable } from "@/hooks/useStable";
import {
  getDocument,
  getFileFromFileName,
  getRoom,
  getYFileMetaData,
} from "@/modules/documents";
import type { AwarenessStates, LocalState } from "@/modules/documents";
import { checkEqual, getHashColor } from "@/modules/utils";

import { EditorContext } from "../Contexts";
import { parseVimrc } from "../Settings";
import {
  activeFileNameState,
  activeRoomIdSelector,
  cursorPositionState,
  editorDidCreateState,
  isNewUserState,
  settingsSelector,
} from "../data-model";
import type { Room, Settings } from "../data-model";
import { useFileName, useRoom } from "../utils";

import "./Editor.css";
import styles from "./Editor.module.css";
import {
  useCommentDecorations,
  useCommentDecorationsHover,
  useCommentHighlightActive,
  useSelectionHandler,
} from "./useCommentHighlights";

export const Editor: React.FC = React.memo(() => {
  const [cursorStyles, setCursorStyles] = React.useState<string[]>([]);
  const { editorDivRef } = React.useContext(EditorContext);

  useMonacoEditor(setCursorStyles);

  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={editorDivRef}></div>
    </>
  );
});
export default Editor;

function useMonacoEditor(
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>
) {
  const { editorDivRef } = React.useContext(EditorContext);
  const settings = useRecoilValue(settingsSelector);
  const { editorRef } = React.useContext(EditorContext);
  const getIsMounted = useIsMounted();
  const room = useRoom();
  const fileName = useFileName();
  const [isNewUser, setIsNewUser] = useRecoilState(isNewUserState);
  const setEditorDidCreate = useSetRecoilState(editorDidCreateState);

  const { createOrUpdate, handleCommentUpdates } = useCommentDecorations();
  const createOrUpdateStable = useStable(createOrUpdate);
  const handleCommentUpdatesStable = useStable(handleCommentUpdates);
  React.useEffect(() => {
    if (!editorDivRef.current || !fileName) {
      return;
    }
    const text = getDocument(room.id, room.password, fileName);
    if (!text) return;
    const { editor, model } = createMonacoEditor(
      editorDivRef.current,
      setCursorStyles,
      settings,
      room,
      fileName,
      text,
      getIsMounted
    );
    editorRef.current = editor;
    // TODO: figure out a better way to determine when the editor has loaded
    const timeoutId = window.setTimeout(() => {
      setEditorDidCreate({});
    }, 100);
    const changeListener = () => {
      const file = getFileFromFileName(room.id, room.password, fileName);
      if (!file) return;
      const metadata = getYFileMetaData(file);

      const now = new Date().toISOString();
      file.set("metadata", {
        ...metadata,
        lastUpdated: now,
      });
    };
    text.observe(changeListener);
    const decorationDispose = createOrUpdateStable();
    const decorationUpdatesDispose = handleCommentUpdatesStable();
    return () => {
      editor.dispose();
      model.dispose();
      text.unobserve(changeListener);
      editorRef.current = undefined;
      decorationDispose?.();
      decorationUpdatesDispose?.();
      clearTimeout(timeoutId);
    };
  }, [
    createOrUpdateStable,
    editorDivRef,
    editorRef,
    fileName,
    getIsMounted,
    handleCommentUpdatesStable,
    room,
    setCursorStyles,
    setEditorDidCreate,
    settings,
  ]);
  React.useEffect(() => {
    const text = getDocument(room.id, room.password, fileName);
    if (!text) return;
    if (isNewUser) {
      if (!text.length) {
        text.insert(0, initialText);
      }
      setIsNewUser(false);
    }
  }, [fileName, isNewUser, room, setIsNewUser]);
  useCommentDecorationsHover();
  useSelectionHandler();
  useCommentHighlightActive();
  useLineRestoration();
}

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  room: Room,
  fileName: string,
  text: Y.Text,
  getIsMounted: () => boolean
) {
  const { provider, ydoc } = getRoom(room.id, room.password);
  // https://stackoverflow.com/questions/56681345/how-to-dynamically-set-language-according-to-file-extension-in-monaco-editor
  const model = monaco.editor.createModel(
    "",
    undefined, // language
    monaco.Uri.file(fileName) // uri
  );
  const isBuiltInTheme = builtInThemes.includes(settings.theme);
  const editor = monaco.editor.create(divEl, {
    model,
    // value: "",
    // language: "markdown",
    theme: settings.theme, // vs-light by default
    automaticLayout: true, // false by default, autoresizes
    fontSize: 16,
    scrollBeyondLastLine: false,
    wordWrap: settings.wordWrap ? "on" : "off",
    minimap: {
      enabled: false,
    },
    scrollbar: {
      vertical: "hidden",
    },
  });
  new MonacoBinding(
    text,
    editor.getModel(),
    new Set([editor]),
    provider.awareness
  );
  setupYjsMonacoCursorData(
    editor,
    ydoc,
    provider,
    setCursorStyles,
    settings,
    getIsMounted
  );
  if (settings.isVim) {
    setupVimBindings(editor, settings.vimrc);
  }
  !isBuiltInTheme && setupThemes(settings.theme);

  editor.focus();
  return { editor, model };
}
const builtInThemes = ["vs", "vs-dark", "hc-black"];

function setupYjsMonacoCursorData(
  editor: monaco.editor.IStandaloneCodeEditor,
  ydoc: Y.Doc,
  provider: WebrtcProvider,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  getIsMounted: () => boolean
) {
  const getLocalState = (): LocalState => ({
    id: settings.id,
    name: settings.name,
    colour: getHashColor(settings.name),
    lineNumber: editor.getPosition()?.lineNumber,
  });
  provider.awareness.setLocalStateField("user", getLocalState());
  editor.onDidChangeCursorPosition(() => {
    provider.awareness.setLocalStateField("user", getLocalState());
  });

  const timeoutIds: { [clientId: string]: number } = {};
  type AwarenessEvent = {
    updated: string[];
    added: string[];
    removed: string[];
  };
  provider.awareness.on("change", ({ updated }: AwarenessEvent) => {
    const cursorData = Array.from(
      provider.awareness.getStates() as AwarenessStates
    )
      .filter(([, { user }]) => user)
      .map(([clientId, { user }]) => ({ clientId, ...user }))
      .filter(
        ({ clientId, id }) => clientId !== ydoc.clientID && id !== settings.id
      );

    const mainCursorStyles = cursorData.map(
      ({ clientId, colour, lineNumber, name }) => {
        const translate =
          lineNumber === 1
            ? "transform: translate(0, 100%);inset-block-end: 0"
            : "transform: translate(0, -100%);inset-block-start: 0";
        return `.yRemoteSelectionHead-${clientId}{color: ${colour}}.yRemoteSelectionHead-${clientId}::after{content: "${name}";background: ${colour};border-color: ${colour};${translate}}`;
      }
    );
    const tempCursorStyles = cursorData
      .filter(({ clientId }) => updated.includes(`${clientId}`))
      .map(
        ({ clientId }) => `.yRemoteSelectionHead-${clientId}::after{opacity:1}`
      );
    setCursorStyles((cursorStyles) =>
      checkEqual(cursorStyles, [...mainCursorStyles, ...tempCursorStyles])
    );
    cursorData.forEach(({ clientId }) => {
      clearTimeout(timeoutIds[clientId]);
      timeoutIds[clientId] = window.setTimeout(() => {
        if (!getIsMounted()) return;
        setCursorStyles((cursorStyles) =>
          checkEqual(
            cursorStyles,
            cursorStyles.filter((c) => !tempCursorStyles.includes(c))
          )
        );
      }, 3000);
    });
  });
}

function useLineRestoration() {
  const { editorRef } = React.useContext(EditorContext);
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));

  const [cursorPosition, setCursorPosition] = useRecoilState(
    cursorPositionState({ fileName, roomId })
  );
  useEffectOnce(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.setPosition(cursorPosition);
    // TODO: figure out a better way to determine when the editor has loaded
    const timeoutId = window.setTimeout(() => {
      editor.revealLineInCenter(cursorPosition.lineNumber);
    }, 100);
    editor.onDidChangeCursorPosition((e) => {
      clearTimeout(lineRestorationTimeoutId);
      lineRestorationTimeoutId = window.setTimeout(() => {
        setCursorPosition(e.position);
      }, 1000);
    });
    return () => {
      clearTimeout(timeoutId);
    };
  });
}
let lineRestorationTimeoutId = 0;

function setupVimBindings(
  editor: monaco.editor.IStandaloneCodeEditor,
  vimrc: string
) {
  initVimMode(editor);
  const parsedVimrc = parseVimrc(vimrc);
  parsedVimrc?.forEach(({ after, before, mode }) => {
    VimMode.Vim.map(before, after, mode);
  });
}

function setupThemes(name: string) {
  import(`monaco-themes/themes/${name}.json`).then((data) => {
    monaco.editor.defineTheme(name, data as any);
    monaco.editor.setTheme(name);
  });
}

declare global {
  interface Window {
    MonacoEnvironment: any;
  }
}

const initialText = `
Collab Notes
============

A scribble pad text editor for those who want to collaborate.

Share this link with others and you can work on the same file together
`.trim();
