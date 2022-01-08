import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { VimMode, initVimMode } from "monaco-vim";
import styles from "./Editor.module.css";

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
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      const { provider, type } = getDocument();
      editor = monaco.editor.create(divEl.current, {
        value: "",
        language: "typescript",
        theme: "vs-dark", // vs-light by default
        automaticLayout: true, // false by default
      });
      new MonacoBinding(
        type,
        editor.getModel(),
        new Set([editor]),
        provider.awareness
      );
      initVimMode(editor);
      VimMode.Vim.map("jk", "<Esc>", "insert");
      import("monaco-themes/themes/Monokai.json").then((data) => {
        monaco.editor.defineTheme("monokai", data as any);
        monaco.editor.setTheme("monokai");
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return <div className={styles.editor} ref={divEl}></div>;
};
