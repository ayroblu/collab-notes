import React from "react";
import { VscCommentDiscussion } from "react-icons/vsc";

import styles from "./NavBar.module.css";
import { CommentSettings } from "./comments/CommentSettings";
import { FacePile } from "./shared/FacePile";
import { Popover } from "./shared/Popover";
import { useFileName } from "./utils";

export const NavBar: React.FC = () => {
  const fileName = useFileName();
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <section className={styles.rightSection}>
        <FacePile />
        <Popover anchor={<VscCommentDiscussion />}>
          <CommentSettings />
        </Popover>
      </section>
    </section>
  );
};
