import styles from "./Spinner.module.css";

export const Spinner: React.FC = () => (
  <div className={styles.center}>
    <div className={styles.dotPulse} />
  </div>
);
