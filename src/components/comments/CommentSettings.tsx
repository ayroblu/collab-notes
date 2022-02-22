import styles from "./CommentSettings.module.css";

export const CommentSettings: React.FC = () => (
  <section className={styles.commentSettings}>
    Comment Settings
    <p>Select resolved comments</p>
    <p>Select open comments</p>
    <p>collapse all</p>
    <p>show all</p>
  </section>
);
