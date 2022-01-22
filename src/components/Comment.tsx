import type { CommentData } from "../modules/documents/types";

import styles from "./Comment.module.css";

type Props = CommentData;
export const Comment: React.FC<Props> = () => {
  return <section className={styles.comment}>Is this an article?</section>;
};
