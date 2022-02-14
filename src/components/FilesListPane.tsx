import React from "react";
import { VscTrash } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";

import {
  deleteFileAndGetNextName,
  getFileFromFileName,
} from "@/modules/documents";

import { FilesList } from "./FilesList";
import styles from "./FilesListPane.module.css";
import type { Room } from "./data-model";
import { useFileName, useFileNameState, useRoom } from "./utils";

export const FilesListPane = () => {
  const fileName = useFileName();
  const handleDelete = useDeleteFile();
  const room = useRoom();
  return (
    <section className={styles.fileslist}>
      <div className={styles.headingBar}>
        <h2 className={styles.heading}>Files</h2>
        {getIsFileActive(fileName, room) && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            <VscTrash />
          </button>
        )}
      </div>
      <FilesList />
    </section>
  );
};

const useDeleteFile = () => {
  const room = useRoom();
  const [fileName, setFileName] = useFileNameState();
  const [, setSearchParams] = useSearchParams();
  return () => {
    if (!fileName) return;
    const confirmation = confirm(
      `Are you sure you want to delete ${fileName}?`,
    );
    if (confirmation) {
      const name = deleteFileAndGetNextName(room.id, room.password, fileName);
      if (name) {
        setFileName(name);
        setSearchParams({ name });
      }
    }
  };
};

function getIsFileActive(fileName: string | null, room: Room): boolean {
  if (!fileName) return false;
  const file = getFileFromFileName(room.id, room.password, fileName);
  return !!file;
}
