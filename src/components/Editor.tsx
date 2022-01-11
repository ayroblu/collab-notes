import * as monaco from "monaco-editor";
import { VimMode, initVimMode } from "monaco-vim";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { MonacoBinding } from "y-monaco";
import { WebrtcProvider } from "y-webrtc";

import { getDocument, getRoom } from "../modules/documents";
import { getRandomColor } from "../modules/utils";


import { Settings, SettingsContext } from "./Contexts";
import styles from "./Editor.module.css";
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

  React.useEffect(() => {
    if (!divElRef.current) {
      return;
    }
    const { editor, model } = createMonacoEditor(
      divElRef.current,
      setCursorStyles,
      settings,
      fileName!
    );
    return () => {
      editor.dispose();
      model.dispose();
    };
  }, [fileName]);

  if (!hasRoom) {
    return <NoMatchFile />;
  }
  return (
    <>
      <style>{cursorStyles.join("")}</style>
      <div className={styles.editor} ref={divElRef}></div>;
    </>
  );
};

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  fileName: string
) {
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId)!;
  const { provider, ydoc, files } = getRoom(room.id, room.password);
  const filesArr = files.toArray();
  let file = filesArr.find(({ name }) => name === fileName);
  if (!file) {
    file = { name: fileName, tags: [] };
    files.push([file]);
  }
  const text = getDocument(room.id, ydoc, file.name);
  // https://stackoverflow.com/questions/56681345/how-to-dynamically-set-language-according-to-file-extension-in-monaco-editor
  const model = monaco.editor.createModel(
    "",
    undefined, // language
    monaco.Uri.file(fileName) // uri
  );
  const editor = monaco.editor.create(divEl, {
    model,
    // value: "",
    // language: "markdown",
    theme: "vs-dark", // vs-light by default
    automaticLayout: true, // false by default, autoresizes
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
  setupYjsMonacoCursorData(provider, setCursorStyles, settings);
  if (settings.isVim) {
    setupVimBindings(editor, settings.vimrc);
  }
  setupThemes(settings.theme);

  editor.focus();
  return { editor, model };
}

const randomColour = getRandomColor();

function setupYjsMonacoCursorData(
  provider: WebrtcProvider,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings
) {
  provider.awareness.setLocalStateField("user", {
    name: settings.name,
    colour: randomColour,
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

function setupVimBindings(
  editor: monaco.editor.IStandaloneCodeEditor,
  vimrc: string
) {
  initVimMode(editor);
  const parsedVimrc = parseVimrc(vimrc);
  parsedVimrc?.forEach(({ mode, before, after }) => {
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
