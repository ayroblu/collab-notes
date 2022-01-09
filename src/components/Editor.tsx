import React from "react";
import * as monaco from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { VimMode, initVimMode } from "monaco-vim";
import styles from "./Editor.module.css";
import { getDocument } from "../modules/documents";
import { getRandomColor } from "../modules/utils";
import { WebrtcProvider } from "y-webrtc";

export const Editor: React.FC = () => {
  const divElRef = React.useRef<HTMLDivElement>(null);
  const [cursorStyles, setCursorStyles] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!divElRef.current) {
      return;
    }
    const editor = createMonacoEditor(divElRef.current, setCursorStyles);
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={divElRef}></div>;
    </>
  );
};

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>
) {
  const { provider, type } = getDocument("name", "password");
  const editor = monaco.editor.create(divEl, {
    value: "",
    language: "markdown",
    theme: "vs-dark", // vs-light by default
    automaticLayout: true, // false by default
    minimap: {
      enabled: false,
    },
  });
  new MonacoBinding(
    type,
    editor.getModel(),
    new Set([editor]),
    provider.awareness
  );
  setupYjsMonacoCursorData(provider, setCursorStyles);
  setupVimBindings(editor);
  setupThemes();

  editor.focus();
  return editor;
}

function setupYjsMonacoCursorData(
  provider: WebrtcProvider,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>
) {
  provider.awareness.setLocalStateField("user", {
    name: `User${(Math.random() * 1000).toFixed()}`,
    colour: getRandomColor(),
  });

  let timeoutIds: { [clientId: string]: number } = {};
  provider.awareness.on("change", ({ updated }: any) => {
    const cursorData = Array.from(provider.awareness.getStates()).map(
      ([clientId, { user }]) => ({ clientId, ...user })
    );

    const mainCursorStyles = cursorData.map(({ clientId, name, colour }) => {
      return `.yRemoteSelectionHead-${clientId}{color: ${colour}}.yRemoteSelectionHead-${clientId}::after{content: "${name}";background: ${colour};border-color: ${colour}}`;
    });
    const tempCursorStyles = cursorData
      .filter(({ clientId }) => updated.includes(clientId))
      .map(({ clientId }) => {
        return `.yRemoteSelectionHead-${clientId}::after{opacity:1}`;
      });
    setCursorStyles([...mainCursorStyles, ...tempCursorStyles]);
    cursorData.forEach(({ clientId }) => {
      clearTimeout(timeoutIds[clientId]);
      timeoutIds[clientId] = window.setTimeout(() => {
        setCursorStyles((cursorStyles) =>
          cursorStyles.filter((c) => !tempCursorStyles.includes(c))
        );
      }, 3000);
    });
  });
}

function setupVimBindings(editor: monaco.editor.IStandaloneCodeEditor) {
  initVimMode(editor);
  VimMode.Vim.map("jk", "<Esc>", "insert");
}

function setupThemes() {
  import("monaco-themes/themes/Monokai.json").then((data) => {
    monaco.editor.defineTheme("monokai", data as any);
    monaco.editor.setTheme("monokai");
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
