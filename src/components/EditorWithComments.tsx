import { getFileTextFromFileName } from "@/modules/documents";

import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { NoMatchFile } from "./NoMatchFile";
import { FilesParamsSync } from "./Sync";
import { CommentsPane } from "./comments/CommentsPane";
import { Editor } from "./editor/Editor";
import { useFileName, useRoom } from "./utils";

export const EditorWithComments: React.FC = () => {
  const room = useRoom();
  const fileName = useFileName();
  const text = getFileTextFromFileName(room.id, room.password, fileName);
  if (!text) {
    return <NoMatchFile />;
  }
  return (
    <FilesParamsSync>
      <section className={styles.wrapper}>
        <NavBar />
        <div className={styles.editorWithComments}>
          <Editor />
          <CommentsPane />
        </div>
      </section>
    </FilesParamsSync>
  );
};
