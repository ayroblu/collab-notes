import React from "react";
import { VscTrash } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";

import {
  deleteFile,
  getFileFromFileName,
  getRoom,
  getYFileMetaData,
} from "@/modules/documents";

import type { Settings } from "./Contexts";
import { SettingsContext } from "./Contexts";
import { FilesList } from "./FilesList";
import styles from "./FilesListPane.module.css";

export const FilesListPane = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const handleDelete = useDeleteFile();
  return (
    <section className={styles.fileslist}>
      <div className={styles.headingBar}>
        <h2>Files</h2>
        {getIsFileActive(fileName, settings) && (
          <button onClick={handleDelete}>
            <VscTrash />
          </button>
        )}
      </div>
      <FilesList />
    </section>
  );
};

const useDeleteFile = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  return () => {
    if (!fileName) return;
    const confirmation = confirm(
      `Are you sure you want to delete ${fileName}?`
    );
    if (confirmation) {
      const room = settings.rooms.find(
        ({ id }) => id === settings.activeRoomId
      );
      if (!room) return;
      const index = deleteFile(room.id, room.password, fileName);
      if (typeof index !== "number") return;

      const { files } = getRoom(room.id, room.password);
      const newIndex = index >= files.length ? files.length - 1 : index;
      setSearchParams({
        name: getYFileMetaData(files.get(newIndex)).name,
      });
    }
  };
};

function getIsFileActive(fileName: string | null, settings: Settings): boolean {
  if (!fileName) return false;
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  if (!room) return false;
  const file = getFileFromFileName(room.id, room.password, fileName);
  return !!file;
}
