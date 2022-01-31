import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { FilesParamsSync } from "./Sync";
import { CommentsPane } from "./comments/CommentsPane";
import { Editor } from "./editor/Editor";

export const EditorWithComments: React.FC = () => (
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
