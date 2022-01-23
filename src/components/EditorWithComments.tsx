import { CommentsPane } from "./CommentsPane";
import { Editor } from "./Editor";
import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";

export const EditorWithComments: React.FC = () => {
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
