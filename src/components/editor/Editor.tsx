import type { Change } from "diff";
import { diffChars } from "diff";
import * as monaco from "monaco-editor";
import { initVimMode, VimMode } from "monaco-vim";
import { format } from "prettier/standalone";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MonacoBinding } from "y-monaco";
import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

import { useIsMounted } from "@/hooks/useIsMounted";
import { useStable } from "@/hooks/useStable";
import { useSuspensePromise } from "@/hooks/useSuspensePromise";
import {
  getDocument,
  getFileFromFileName,
  getRoom,
  getYFileMetaData,
} from "@/modules/documents";
import type { AwarenessStates, LocalState } from "@/modules/documents";
import type { Override } from "@/modules/utils";
import { checkEqual, getHashColor, nonNullable } from "@/modules/utils";

import { EditorContext } from "../Contexts";
import { parseVimrc } from "../Settings";
import {
  activeFileNameState,
  activeRoomIdSelector,
  cursorPositionState,
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
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
) {
  const { editorDivRef } = React.useContext(EditorContext);
  const settings = useRecoilValue(settingsSelector);
  const { setEditor } = React.useContext(EditorContext);
  const getIsMounted = useIsMounted();
  const room = useRoom();
  const fileName = useFileName();
  const [isNewUser, setIsNewUser] = useRecoilState(isNewUserState);
  const prettierPlugins = usePrettierPlugins(fileName);

  useCommentDecorations();
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
      getIsMounted,
    );
    setEditor(editor);
    setupPrettierIntegration(fileName, editor, model, prettierPlugins);
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
      setEditor(null);
    };
  }, [
    editorDivRef,
    setEditor,
    fileName,
    getIsMounted,
    room,
    setCursorStyles,
    settings,
    prettierPlugins,
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

const usePrettierPlugins = (fileName: string) => {
  const ext = /\.(?<ext>\w+)$/g.exec(fileName)?.groups?.["ext"];
  const pluginImports = getPrettierPlugins(ext);
  const plugins = useSuspensePromise(
    `prettier-${ext}`,
    () => Promise.all(pluginImports()),
    [ext],
  );
  return plugins;
};
function setupPrettierIntegration(
  fileName: string,
  editor: monaco.editor.IStandaloneCodeEditor,
  model: monaco.editor.ITextModel,
  plugins: any[],
) {
  const ext = /\.(?<ext>\w+)$/g.exec(fileName)?.groups?.["ext"];
  const parser = getPrettierParser(ext);
  if (parser) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const former = editor.getValue();
      const formatted = format(former, { parser, plugins });

      const diff = diffChars(former, formatted);
      runDiffForEditor(editor, model, diff);
    });
  }
}

function runDiffForEditor(
  editor: monaco.editor.IStandaloneCodeEditor,
  model: monaco.editor.ITextModel,
  diff: Change[],
): void {
  const getRange = (startIndex: number, endIndex: number) => {
    const startPosition = model.getPositionAt(startIndex);
    const endPosition = model.getPositionAt(endIndex);
    return new monaco.Range(
      startPosition.lineNumber,
      startPosition.column,
      endPosition.lineNumber,
      endPosition.column,
    );
  };
  type ModDiff = {
    modified?: boolean;
    count: number;
    value: string;
  };
  const mutateModDiff = (
    modDiff: ModDiff,
    { added, count, removed, value }: Override<Change, { count: number }>,
  ): void => {
    if (added) {
      // replaceValue = value, count = 0 => added
      modDiff.value += value;
    } else if (removed) {
      modDiff.count += count!;
    }
  };
  let index = 0;
  const edits: monaco.editor.IIdentifiedSingleEditOperation[] = diff
    .reduce<ModDiff[]>((a, { added, count, removed, value }) => {
      if (!count) return a;
      if (added || removed) {
        const previous = a[a.length - 1];
        if (previous?.modified) {
          mutateModDiff(previous, { added, count, removed, value });
        } else {
          const diff = { modified: true, count: 0, value: "" };
          a.push(diff);
          mutateModDiff(diff, { added, count, removed, value });
        }
      } else {
        a.push({ count, value });
      }
      return a;
    }, [])
    .map(({ count, modified, value }) => {
      if (modified) {
        index += count;
        return {
          range: getRange(index - count, index),
          text: value,
        };
      } else {
        index += count;
        return null;
      }
    })
    .filter(nonNullable);
  editor.executeEdits("prettier-edit", edits);
}

function getPrettierPlugins(ext: string | undefined): () => Promise<any>[] {
  switch (ext) {
    case "graphql":
      return () => [import("prettier/parser-graphql")];
    case "html":
      return () => [
        import("prettier/parser-html"),
        import("prettier/parser-postcss"),
        import("prettier/parser-babel"),
      ];
    case "js":
    case "jsx":
    case "mjs":
    case "json":
    case "json5":
    case "mdx":
      return () => [import("prettier/parser-babel")];
    case "ts":
    case "tsx":
      return () => [import("prettier/parser-typescript")];
    // case 'md':
    //   return ['markdown']
    case "css":
      return () => [import("prettier/parser-postcss")];
    case "yml":
    case "yaml":
      return () => [import("prettier/parser-yaml")];
    default:
      return () => [];
  }
}
function getPrettierParser(ext: string | undefined): string | null {
  switch (ext) {
    case "graphql":
      return "graphql";
    case "html":
      return "html";
    case "js":
    case "jsx":
    case "mjs":
      return "babel";
    case "ts":
    case "tsx":
      return "typescript";
    // case 'md':
    //   return ['markdown']
    case "css":
      return "css";
    case "json":
      return "json";
    case "json5":
      return "json5";
    case "mdx":
      return "mdx";
    case "yml":
    case "yaml":
      return "yaml";
    default:
      return null;
  }
}

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  room: Room,
  fileName: string,
  text: Y.Text,
  getIsMounted: () => boolean,
) {
  const { provider, ydoc } = getRoom(room.id, room.password);
  // https://stackoverflow.com/questions/56681345/how-to-dynamically-set-language-according-to-file-extension-in-monaco-editor
  const model = monaco.editor.createModel(
    "",
    undefined, // language
    monaco.Uri.file(fileName), // uri
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
    autoClosingBrackets: "never",
    tabSize: 2,
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
    provider.awareness,
  );
  setupYjsMonacoCursorData(
    editor,
    ydoc,
    provider,
    setCursorStyles,
    settings,
    getIsMounted,
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
  getIsMounted: () => boolean,
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
      provider.awareness.getStates() as AwarenessStates,
    )
      .filter(([, { user }]) => user)
      .map(([clientId, { user }]) => ({ clientId, ...user }))
      .filter(
        ({ clientId, id }) => clientId !== ydoc.clientID && id !== settings.id,
      );

    const mainCursorStyles = cursorData.map(
      ({ clientId, colour, lineNumber, name }) => {
        const translate =
          lineNumber === 1
            ? "transform: translate(0, 100%);inset-block-end: 0"
            : "transform: translate(0, -100%);inset-block-start: 0";
        return `.yRemoteSelectionHead-${clientId}{color: ${colour}}.yRemoteSelectionHead-${clientId}::after{content: "${name}";background: ${colour};border-color: ${colour};${translate}}`;
      },
    );
    const tempCursorStyles = cursorData
      .filter(({ clientId }) => updated.includes(`${clientId}`))
      .map(
        ({ clientId }) => `.yRemoteSelectionHead-${clientId}::after{opacity:1}`,
      );
    setCursorStyles((cursorStyles) =>
      checkEqual(cursorStyles, [...mainCursorStyles, ...tempCursorStyles]),
    );
    cursorData.forEach(({ clientId }) => {
      clearTimeout(timeoutIds[clientId]);
      timeoutIds[clientId] = window.setTimeout(() => {
        if (!getIsMounted()) return;
        setCursorStyles((cursorStyles) =>
          checkEqual(
            cursorStyles,
            cursorStyles.filter((c) => !tempCursorStyles.includes(c)),
          ),
        );
      }, 3000);
    });
  });
}

function useLineRestoration() {
  const { editor } = React.useContext(EditorContext);
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));

  const [cursorPosition, setCursorPosition] = useRecoilState(
    cursorPositionState({ fileName, roomId }),
  );
  const cursorPositionStable = useStable(() => cursorPosition);
  React.useEffect(() => {
    if (!editor) return;
    const cursorPosition = cursorPositionStable();
    editor.setPosition(cursorPosition);
    editor.revealLineInCenter(cursorPosition.lineNumber);
    let lineRestorationTimeoutId = 0;
    editor.onDidChangeCursorPosition((e) => {
      clearTimeout(lineRestorationTimeoutId);
      lineRestorationTimeoutId = window.setTimeout(() => {
        setCursorPosition(e.position);
      }, 200);
    });
    return () => {
      clearTimeout(lineRestorationTimeoutId);
    };
  }, [cursorPositionStable, editor, setCursorPosition]);
}

function setupVimBindings(
  editor: monaco.editor.IStandaloneCodeEditor,
  vimrc: string,
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
