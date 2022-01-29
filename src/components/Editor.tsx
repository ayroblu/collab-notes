import * as monaco from "monaco-editor";
import { initVimMode, VimMode } from "monaco-vim";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { MonacoBinding } from "y-monaco";
import type { WebrtcProvider } from "y-webrtc";
import type * as Y from "yjs";

import { useIsMounted } from "@/hooks/useIsMounted";
import type { AwarenessStates, LocalState } from "@/modules/documents";
import {
  createNewFile,
  getDocument,
  getFileFromFileName,
  getRoom,
  getYFileMetaData,
  getYFileText,
} from "@/modules/documents";
import { cn, getHashColor } from "@/modules/utils";

import { CommentsContext, EditorContext } from "./Contexts";
import "./Editor.css";
import styles from "./Editor.module.css";
import { NoMatchFile } from "./NoMatchFile";
import { parseVimrc } from "./Settings";
import {
  inProgressCommentsSelector,
  isNewUserState,
  settingsState,
} from "./data-model";
import type { Room ,
  Settings} from "./data-model";
import { useComments, useFileName, useRoom } from "./utils";

export const Editor: React.FC = () => {
  const [cursorStyles, setCursorStyles] = React.useState<string[]>([]);
  const { editorDivRef } = React.useContext(EditorContext);
  const room = useRoom();

  useMonacoEditor(setCursorStyles);

  if (!room) {
    return <NoMatchFile />;
  }
  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={editorDivRef}></div>
    </>
  );
};

function useMonacoEditor(
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>
) {
  const { editorDivRef } = React.useContext(EditorContext);
  const settings = useRecoilValue(settingsState);
  const { editorRef } = React.useContext(EditorContext);
  const getIsMounted = useIsMounted();
  const room = useRoom();
  const fileName = useFileName();
  const [isNewUser, setIsNewUser] = useRecoilState(isNewUserState);

  React.useEffect(() => {
    if (!editorDivRef.current || !fileName) {
      return;
    }
    if (!room) return;
    const { editor, model, text } = createMonacoEditor(
      editorDivRef.current,
      setCursorStyles,
      settings,
      room,
      fileName,
      getIsMounted
    );
    editorRef.current = editor;
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
  }, [
    editorDivRef,
    editorRef,
    fileName,
    getIsMounted,
    room,
    setCursorStyles,
    settings,
  ]);
  React.useEffect(() => {
    if (!room) return;
    const text = getDocument(room.id, room.password, fileName);
    if (!text) return;
    if (isNewUser) {
      if (!text.length) {
        text.insert(0, initialText);
      }
      setIsNewUser(false);
    }
  }, [fileName, isNewUser, room, setIsNewUser]);
  useCommentSelections();
  useCommentHighlights();

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.layout({ width: 300, height: 300 });
    editor.layout();
  }, [editorRef]);
}

const useCommentSelections = () => {
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
    setDecorations((decorations) =>
      editor.deltaDecorations(decorations, newDecorations)
    );
  }, [inProgressComments, comments, editorRef]);
};

const useCommentHighlights = () => {
  const { commentRefs } = React.useContext(CommentsContext);
  const comments = useComments();
  React.useEffect(() => {
    let rafId = 0;
    const mouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        [...document.querySelectorAll(`.${styles.selection}`)].forEach((v) => {
          const isIn = isMouseInDOMRect(e, v.getBoundingClientRect());
          if (isIn && !v.classList.contains(styles.selectionHover)) {
            v.classList.add(styles.selectionHover);
          } else if (!isIn && v.classList.contains(styles.selectionHover)) {
            v.classList.remove(styles.selectionHover);
          }

          const classes = [...v.classList];
          const commentClass = classes.find((c) => c.startsWith("comment-"));
          if (!commentClass) return;
          const commentId = commentClass.replace("comment-", "");
          const el = commentRefs.current[commentId]?.el;
          if (!el) return;
          if (isIn) {
            el.classList.add(styles.commentHover);
          } else if (!isIn) {
            el.classList.remove(styles.commentHover);
          }
        });
      });
    };
    document.body.addEventListener("mousemove", mouseMove);
    return () => {
      document.body.removeEventListener("mousemove", mouseMove);
    };
  }, [commentRefs, comments]);
};
function isMouseInDOMRect(e: MouseEvent, r: DOMRect) {
  const isIn =
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom;
  return isIn;
}
// const useCommentHighlights = () => {
//   const { commentRefs, comments } = React.useContext(CommentsContext);
//   const { editorRef } = React.useContext(EditorContext);
//   React.useEffect(() => {
//     const editor = editorRef.current;
//     if (!editor) return;
//     let disposes: (() => void)[] = [];
//     const { dispose } = editor.onDidChangeModelDecorations(() => {
//       if (disposes.length === comments.length) return;
//       disposes.forEach((d) => d());
//       disposes = [...document.querySelectorAll(`.${styles.selection}`)].map(
//         (v) => {
//           const mouseEnter = () => {
//             const classes = [...v.classList];
//             const commentClass = classes.find((c) => c.startsWith("comment-"));
//             if (!commentClass) return;
//             const commentId = commentClass.replace("comment-", "");
//             const el = commentRefs.current[commentId]?.el;
//             if (!el) return;
//             el.classList.add(styles.commentHover);
//           };
//           const mouseLeave = () => {
//             const classes = [...v.classList];
//             const commentClass = classes.find((c) => c.startsWith("comment-"));
//             if (!commentClass) return;
//             const commentId = commentClass.replace("comment-", "");
//             const el = commentRefs.current[commentId]?.el;
//             if (!el) return;
//             el.classList.remove(styles.commentHover);
//           };
//           v.addEventListener("mouseenter", mouseEnter);
//           v.addEventListener("mouseleave", mouseLeave);
//           return () => {
//             v.removeEventListener("mouseenter", mouseEnter);
//             v.removeEventListener("mouseenter", mouseLeave);
//           };
//         }
//       );
//     });
//     return () => {
//       dispose();
//     };
//   }, [comments]);
// };

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  room: Room,
  fileName: string,
  getIsMounted: () => boolean
) {
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
  return { editor, model, text };
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

  let timeoutIds: { [clientId: string]: number } = {};
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
      .filter(({ clientId }) => updated.includes(clientId + ""))
      .map(
        ({ clientId }) => `.yRemoteSelectionHead-${clientId}::after{opacity:1}`
      );
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
