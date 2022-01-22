import React from "react";
import { useSearchParams } from "react-router-dom";

import { FacePile } from "./FacePile";
import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  if (!fileName) return null;
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <FacePile />
    </section>
  );
};
