import * as monaco from "monaco-editor";
import { VimMode, initVimMode } from "monaco-vim";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { MonacoBinding } from "y-monaco";
import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

import { useIsMounted } from "@/hooks/useIsMounted";

import {
  getComments,
  getYFileMetaData,
  getYFileText,
} from "../modules/documents";
import { createNewFile, getFileFromFileName } from "../modules/documents";
import { getRoom } from "../modules/documents";
import { getRandomColor } from "../modules/utils";

import type { Settings } from "./Contexts";
import { EditorContext } from "./Contexts";
import { SettingsContext } from "./Contexts";
import styles from "./Editor.module.css";
import "./Editor.css";
import { NoMatchFile } from "./NoMatchFile";
import { parseVimrc } from "./Settings";

export const Editor: React.FC = () => {
  const divElRef = React.useRef<HTMLDivElement>(null);
  const [cursorStyles, setCursorStyles] = React.useState<string[]>([]);
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const hasRoom =
    fileName && settings.rooms.find(({ id }) => id === settings.activeRoomId);

  useMonacoEditor(divElRef, setCursorStyles);

  if (!hasRoom) {
    return <NoMatchFile />;
  }
  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={divElRef}></div>
    </>
  );
};

function useMonacoEditor(
  divElRef: React.RefObject<HTMLDivElement>,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>
) {
  const { settings } = React.useContext(SettingsContext);
  const { editorRef } = React.useContext(EditorContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const isNewUser = searchParams.get("newUser");
  const getIsMounted = useIsMounted();

  React.useEffect(() => {
    if (!divElRef.current || !fileName) {
      return;
    }
    const { editor, model, text } = createMonacoEditor(
      divElRef.current,
      setCursorStyles,
      settings,
      fileName!,
      getIsMounted
    );
    editorRef.current = editor;
    if (isNewUser) {
      if (!text.length) {
        text.insert(0, initialText);
      }
      setSearchParams(
        Object.fromEntries([...searchParams].filter(([k]) => k !== "newUser"))
      );
    }
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
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
    return () => {
      editor.dispose();
      model.dispose();
      text.unobserve(changeListener);
    };
  }, [fileName, settings.activeRoomId]);
  useCommentSelections();

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.layout({ width: 300, height: 300 });
    editor.layout();
  }, [settings]);
}

const useCommentSelections = () => {
  const [searchParams] = useSearchParams();
  const { editorRef } = React.useContext(EditorContext);
  const [decorations, setDecorations] = React.useState<string[]>([]);
  const fileName = searchParams.get("name");
  const { settings } = React.useContext(SettingsContext);
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  if (!room) return;
  if (!fileName) return;
  React.useEffect(() => {
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;
    const newDecorations = yComments.map(
      ({ endColumn, endLineNumber, startColumn, startLineNumber }) => {
        return {
          range: new monaco.Range(
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn
          ),
          options: {
            className: styles.selection,
            beforeContentClassName: styles.selection,
            afterContentClassName: styles.selection,
          },
        };
      }
    );
    const editor = editorRef.current;
    if (!editor) return;
    setDecorations(editor.deltaDecorations(decorations, newDecorations));
  });
};

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  fileName: string,
  getIsMounted: () => boolean
) {
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId)!;
  const { provider, ydoc } = getRoom(room.id, room.password);
  let file = getFileFromFileName(room.id, room.password, fileName);
  if (!file) {
    file = createNewFile(room.id, room.password, fileName);
  }
  const text = getYFileText(file);
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
  return { editor, model, text };
}
const builtInThemes = ["vs", "vs-dark", "hc-black"];

const randomColour = getRandomColor();

function setupYjsMonacoCursorData(
  editor: monaco.editor.IStandaloneCodeEditor,
  ydoc: Y.Doc,
  provider: WebrtcProvider,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  getIsMounted: () => boolean
) {
  provider.awareness.setLocalStateField("user", {
    name: settings.name,
    colour: randomColour,
    lineNumber: editor.getPosition()?.lineNumber,
  });
  editor.onDidChangeCursorPosition(() => {
    provider.awareness.setLocalStateField("user", {
      name: settings.name,
      colour: randomColour,
      lineNumber: editor.getPosition()?.lineNumber,
    });
  });

  let timeoutIds: { [clientId: string]: number } = {};
  type AwarenessEvent = {
    updated: string[];
    added: string[];
    removed: string[];
  };
  provider.awareness.on("change", ({ updated }: AwarenessEvent) => {
    const cursorData = Array.from(provider.awareness.getStates())
      .map(([clientId, { user }]) => ({ clientId, ...user }))
      .filter(({ clientId }) => clientId !== ydoc.clientID);

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
      .filter(({ clientId }) => updated.includes(clientId))
      .map(({ clientId }) => {
        return `.yRemoteSelectionHead-${clientId}::after{opacity:1}`;
      });
    setCursorStyles([...mainCursorStyles, ...tempCursorStyles]);
    cursorData.forEach(({ clientId }) => {
      clearTimeout(timeoutIds[clientId]);
      timeoutIds[clientId] = window.setTimeout(() => {
        if (!getIsMounted()) return;
        setCursorStyles((cursorStyles) =>
          cursorStyles.filter((c) => !tempCursorStyles.includes(c))
        );
      }, 3000);
    });
  });
}

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

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "./css.worker.bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  },
};

const initialText = `
Collab Notes
============

A scribble pad text editor for those who want to collaborate.

Share this link with others and you can work on the same file together
`.trim();
