import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { initVimMode } from "monaco-vim";

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

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("monaco", ydoc);
const type = ydoc.getText("monaco");

export const Editor: React.FC = () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: "",
        language: "typescript",
        theme: "vs-dark",
      });
      new MonacoBinding(
        type,
        editor.getModel(),
        new Set([editor]),
        provider.awareness
      );
      initVimMode(editor);
      import("monaco-themes/themes/Monokai.json").then((data) => {
        monaco.editor.defineTheme("monokai", data as any);
        monaco.editor.setTheme("monokai");
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return <div className="Editor" ref={divEl}></div>;
};
