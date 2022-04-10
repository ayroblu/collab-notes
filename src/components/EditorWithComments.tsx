import React from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { createNewFile, getDocument } from "@/modules/documents";
import { getIsSmallScreen } from "@/modules/utils";

import styles from "./EditorWithComments.module.css";
import { NavBar } from "./NavBar";
import { NoMatchFile } from "./NoMatchFile";
import { FilesParamsSync } from "./Sync";
import { SimpleCommentButton } from "./comments/CommentButton";
import { CommentsPane } from "./comments/CommentsPane";
import {
  activeFileNameState,
  commentDrawerVisibleState,
  previewDrawerVisibleState,
} from "./data-model";
import { Drawer } from "./shared/Drawer";
import { Markdown } from "./shared/Markdown";
import { useFileName, useRoom } from "./utils";

const Editor = React.lazy(() => import("./editor/Editor"));

export const EditorWithComments: React.FC = () => (
  <FilesParamsSync fallback={<NewFileDialog />}>
    <MainEditorWithComments />
  </FilesParamsSync>
);

const MainEditorWithComments: React.FC = () => {
  const room = useRoom();
  const fileName = useFileName();
  const [isCommentDrawerVisible, setIsCommentDrawerVisible] = useRecoilState(
    commentDrawerVisibleState,
  );
  const [isPreviewDrawerVisible, setIsPreviewDrawerVisible] = useRecoilState(
    previewDrawerVisibleState,
  );
  const isSmallScreen = getIsSmallScreen();
  const text = getDocument(room.id, room.password, fileName);
  if (!text) {
    return <NoMatchFile />;
  }
  return (
    <section className={styles.wrapper}>
      <NavBar />
      <div
        className={
          isCommentDrawerVisible && !isSmallScreen
            ? styles.editorWithCommentsDesktop
            : styles.editorWithComments
        }
      >
        <Editor />
        <Drawer
          isVisible={isPreviewDrawerVisible}
          position="end"
          setIsVisible={() => setIsPreviewDrawerVisible(false)}
        >
          <MarkdownPreview />
        </Drawer>
        {isSmallScreen ? (
          <>
            <Drawer
              isVisible={isCommentDrawerVisible}
              position="end"
              preserveOffscreen
              setIsVisible={() => setIsCommentDrawerVisible(false)}
            >
              <CommentsPane />
            </Drawer>
            <NewCommentButton />
          </>
        ) : (
          <>
            {isCommentDrawerVisible ? <CommentsPane /> : <NewCommentButton />}
          </>
        )}
      </div>
    </section>
  );
};

const NewCommentButton: React.FC = () => (
  <SimpleCommentButton className={styles.newCommentButton} />
);

const NewFileDialog: React.FC = () => {
  const room = useRoom();
  const [, setSearchParams] = useSearchParams();
  const setFileName = useSetRecoilState(activeFileNameState(room.id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleNewFile(e.currentTarget.value.trim());
    }
  };

  const handleNewFile = React.useCallback(
    (name: string) => {
      if (!name) return;

      createNewFile(room.id, room.password, name);
      setFileName(name);
      setSearchParams({ name });
    },
    [room.id, room.password, setFileName, setSearchParams],
  );
  const handleNewFileFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleNewFile(e.currentTarget.value.trim());
    },
    [handleNewFile],
  );

  return (
    <section className={styles.newFile}>
      <h2>Add new file</h2>
      <input
        autoFocus
        onBlur={handleNewFileFocus}
        onKeyDown={handleKeyDown}
        placeholder="filename.ts"
      />
    </section>
  );
};

const MarkdownPreview: React.FC = () => {
  const room = useRoom();
  const fileName = useFileName();
  const text = getDocument(room.id, room.password, fileName);
  if (!text) return;
  return (
    <section className={styles.markdownPreview}>
      <Markdown text={text.toString()} />
    </section>
  );
};
