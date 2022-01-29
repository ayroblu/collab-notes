import React from "react";
import { VscTrash } from "react-icons/vsc";

import {
  deleteFile,
  getFileFromFileName,
  getRoom,
  getYFileMetaData,
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
  return () => {
    if (!fileName) return;
    const confirmation = confirm(
      `Are you sure you want to delete ${fileName}?`
    );
    if (confirmation) {
      if (!room) return;
      const index = deleteFile(room.id, room.password, fileName);
      if (typeof index !== "number") return;

      const { files } = getRoom(room.id, room.password);
      const newIndex = index >= files.length ? files.length - 1 : index;
      setFileName(getYFileMetaData(files.get(newIndex)).name);
    }
  };
};

function getIsFileActive(
  fileName: string | null,
  room: Room | undefined
): boolean {
  if (!fileName) return false;
  if (!room) return false;
  const file = getFileFromFileName(room.id, room.password, fileName);
  return !!file;
}
