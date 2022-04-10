import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { useRecoilState, useRecoilValue } from "recoil";

import { cn } from "@/modules/utils";

import styles from "./NavBar.module.css";
import { CommentSettings } from "./comments/CommentSettings";
import { commentDrawerVisibleState, showCommentsState } from "./data-model";
import { Button } from "./shared/Button";
import { FacePile } from "./shared/FacePile";
import { Popover } from "./shared/Popover";
import { useComments, useFileName, useFileParams } from "./utils";

export const NavBar: React.FC = () => {
  const fileName = useFileName();
  const [isCommentDrawerVisible, setIsCommentDrawerVisible] = useRecoilState(
    commentDrawerVisibleState,
  );
  const onButtonClick = React.useCallback(() => {
    setIsCommentDrawerVisible((isVisible) => !isVisible);
  }, [setIsCommentDrawerVisible]);
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <section className={styles.endSection}>
        <div className={styles.facepileContainer}>
          <FacePile />
        </div>
        <CommentSettingsMenuItem />
        <Button
          onClick={onButtonClick}
          title={isCommentDrawerVisible ? "Hide Comments" : "Show Comments"}
        >
          {isCommentDrawerVisible ? (
            <HiChevronDoubleRight />
          ) : (
            <HiChevronDoubleLeft />
          )}
        </Button>
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
        buttonProps={{ title: "Comment Settings" }}
        buttonTestId="CommentSettingsButton"
      >
        <CommentSettings />
      </Popover>
    );
  }
  return null;
};
