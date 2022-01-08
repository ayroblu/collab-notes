import React from "react";

import styles from "./NavBar.module.css";

export const NavBar = (): React.ReactNode => {
  return (
    <nav className={styles.nav}>
      <a href="/">Collab Notes</a>
      <a href="/">Settings</a>
    </nav>
  );
};
