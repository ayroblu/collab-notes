import * as monaco from "monaco-editor";
import { VimMode, initVimMode } from "monaco-vim";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { MonacoBinding } from "y-monaco";
import type { WebrtcProvider } from "y-webrtc";

import type { FileMetaData } from "../modules/documents";
import { getDocument, getRoom } from "../modules/documents";
import { getRandomColor } from "../modules/utils";

import type { Settings } from "./Contexts";
import { SettingsContext } from "./Contexts";
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
    const { editor, model, text } = createMonacoEditor(
      divElRef.current,
      setCursorStyles,
      settings,
      fileName!
    );
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    const { files, ydoc } = getRoom(room.id, room.password);
    const changeListener = () => {
      const index = (files.toJSON() as FileMetaData[]).findIndex(
        ({ name }) => name === fileName
      );
      const file = files.get(index);
      ydoc.transact(() => {
        files.delete(index, 1);
        files.insert(index, [
          { ...file, lastUpdated: new Date().toISOString() },
        ]);
      });
    };
    text.observe(changeListener);
    return () => {
      editor.dispose();
      model.dispose();
      text.unobserve(changeListener);
    };
  }, [fileName]);

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

function createMonacoEditor(
  divEl: HTMLDivElement,
  setCursorStyles: React.Dispatch<React.SetStateAction<string[]>>,
  settings: Settings,
  fileName: string
) {
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId)!;
  const { files, provider, ydoc } = getRoom(room.id, room.password);
  const filesArr = files.toArray();
  let file = filesArr.find(({ name }) => name === fileName);
  if (!file) {
    const now = new Date().toISOString();
    file = { name: fileName, tags: [], lastUpdated: now, dateCreated: now };
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
    fontSize: 16,
    scrollBeyondLastLine: false,
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
  return { editor, model, text };
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

    const mainCursorStyles = cursorData.map(({ clientId, colour, name }) => {
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
