import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { createNewFile, getDocument } from "@/modules/documents";

import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { NoMatchFile } from "./NoMatchFile";
import { FilesParamsSync } from "./Sync";
import { CommentsPane } from "./comments/CommentsPane";
import { activeFileNameState } from "./data-model";
import { useFileName, useRoom } from "./utils";

const Editor = React.lazy(() => import("./editor/Editor"));

export const EditorWithComments: React.FC = () => (
  <FilesParamsSync fallback={<NewFileDialog />}>
    <MainEditorWithComments />
  </FilesParamsSync>
);

const MainEditorWithComments: React.FC = () => {
  const room = useRoom();
  const fileName = useFileName();
  const text = getDocument(room.id, room.password, fileName);
  if (!text) {
    return <NoMatchFile />;
  }
  return (
    <section className={styles.wrapper}>
      <NavBar />
      <div className={styles.editorWithComments}>
        <Editor />
        <CommentsPane />
      </div>
    </section>
  );
};

const NewFileDialog: React.FC = () => {
  const room = useRoom();
  const [, setSearchParams] = useSearchParams();
  const setFileName = useSetRecoilState(activeFileNameState(room.id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleNewFile(e.currentTarget.value.trim());
    }
  };

  const handleNewFile = React.useCallback(
    (name: string) => {
      if (!name) return;

      createNewFile(room.id, room.password, name);
      setFileName(name);
      setSearchParams({ name });
    },
    [room.id, room.password, setFileName, setSearchParams],
  );
  const handleNewFileFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleNewFile(e.currentTarget.value.trim());
    },
    [handleNewFile],
  );

  return (
    <section className={styles.newFile}>
      <h2>Add new file</h2>
      <input
        onKeyDown={handleKeyDown}
        onBlur={handleNewFileFocus}
        placeholder="filename.ts"
        autoFocus
      />
    </section>
  );
};
