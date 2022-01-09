import React from "react";

import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  return (
    <header className={styles.nav}>
      <h1 className={styles.pageTitle}>
        <a href="/">Collab Notes</a>
      </h1>
      <a href="/">Settings</a>
    </header>
  );
};
