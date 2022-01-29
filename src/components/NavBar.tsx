import React from "react";

import styles from "./NavBar.module.css";
import { FacePile } from "./shared/FacePile";
import { useFileName } from "./utils";

export const NavBar: React.FC = () => {
  const fileName = useFileName();
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <FacePile />
    </section>
  );
};
