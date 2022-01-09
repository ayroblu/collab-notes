import React from "react";
import * as monaco from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { VimMode, initVimMode } from "monaco-vim";
import styles from "./Editor.module.css";
import { getDocument } from "../modules/documents";
import { getRandomColor } from "../modules/utils";

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

export const Editor: React.FC = () => {
  const divEl = React.useRef<HTMLDivElement>(null);
  const [cursorStyles, setCursorStyles] = React.useState<string[]>([]);
  let editor: monaco.editor.IStandaloneCodeEditor;
  React.useEffect(() => {
    if (divEl.current) {
      const { provider, type } = getDocument("name", "password");
      editor = monaco.editor.create(divEl.current, {
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
      provider.awareness.setLocalStateField("user", {
        name: `User${(Math.random() * 1000).toFixed()}`,
        colour: getRandomColor(),
      });
      let timeoutId = 0;
      provider.awareness.on("change", ({ updated }: any) => {
        const cursorData = Array.from(provider.awareness.getStates()).map(
          ([clientId, { user }]) => ({ clientId, ...user })
        );
        const cursorStyles = cursorData.map(({ clientId, name, colour }) => {
          const opacity = updated.includes(clientId) ? "opacity:1" : "";
          return `.yRemoteSelectionHead-${clientId}{color: ${colour}}.yRemoteSelectionHead-${clientId}::after{content: "${name}";background: ${colour};border-color: ${colour};${opacity}}`;
        });
        const cursorStylesFadedOut = cursorData.map(
          ({ clientId, name, colour }) => {
            return `.yRemoteSelectionHead-${clientId}{color: ${colour}}.yRemoteSelectionHead-${clientId}::after{content: "${name}";background: ${colour};border-color: ${colour}}`;
          }
        );
        setCursorStyles(cursorStyles);
        clearTimeout(timeoutId);
        window.setTimeout(() => {
          setCursorStyles(cursorStylesFadedOut);
        }, 5000);
      });
      initVimMode(editor);
      VimMode.Vim.map("jk", "<Esc>", "insert");
      import("monaco-themes/themes/Monokai.json").then((data) => {
        monaco.editor.defineTheme("monokai", data as any);
        monaco.editor.setTheme("monokai");
      });
      editor.focus();
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={divEl}></div>;
    </>
  );
};
