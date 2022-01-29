import { Editor } from "./Editor";
import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { FileSearchParamsSync } from "./Sync";
import { CommentsPane } from "./comments/CommentsPane";

export const EditorWithComments: React.FC = () => (
  <section className={styles.wrapper}>
    <FileSearchParamsSync />
    <NavBar />
    <div className={styles.editorWithComments}>
      <Editor />
      <CommentsPane />
    </div>
  </section>
);
