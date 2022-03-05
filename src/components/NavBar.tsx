import React from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { useRecoilValue } from "recoil";

import { cn } from "@/modules/utils";

import styles from "./NavBar.module.css";
import { CommentSettings } from "./comments/CommentSettings";
import { showCommentsState } from "./data-model";
import { FacePile } from "./shared/FacePile";
import { Popover } from "./shared/Popover";
import { useComments, useFileName, useFileParams } from "./utils";

export const NavBar: React.FC = () => {
  const fileName = useFileName();
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <section className={styles.endSection}>
        <FacePile />
        <CommentSettingsMenuItem />
      </section>
    </section>
  );
};

const CommentSettingsMenuItem = () => {
  const comments = useComments();
  const { fileName, roomId } = useFileParams();
  const showComments = useRecoilValue(showCommentsState({ fileName, roomId }));
  if (comments.length) {
    return (
      <Popover
        anchor={
          <VscCommentDiscussion
            className={cn(showComments === "resolved" && styles.resolved)}
          />
        }
        buttonTestId="CommentSettingsButton"
      >
        <CommentSettings />
      </Popover>
    );
  }
  return null;
};
