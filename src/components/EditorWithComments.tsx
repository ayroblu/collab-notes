import React from "react";

import { getDocument } from "@/modules/documents";

import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { NoMatchFile } from "./NoMatchFile";
import { FilesParamsSync } from "./Sync";
import { CommentsPane } from "./comments/CommentsPane";
import { useFileName, useRoom } from "./utils";

const Editor = React.lazy(() => import("./editor/Editor"));

export const EditorWithComments: React.FC = () => (
  <FilesParamsSync>
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
