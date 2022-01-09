import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  return (
    <header className={styles.nav}>
      <button>Files</button>
      <h1 className={styles.pageTitle}>
        <Link to="/">Collab Notes</Link>
      </h1>
      <Link to="/settings">Settings</Link>
    </header>
  );
};
