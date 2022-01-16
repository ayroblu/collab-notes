import React from "react";
import {
  SiCss3,
  SiFiles,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiRust,
  SiScala,
  SiTypescript,
} from "react-icons/si";
import { VscNewFile, VscTrash } from "react-icons/vsc";
import { Link, useSearchParams } from "react-router-dom";

import type { FileMetaData } from "../modules/documents";
import { getDocument } from "../modules/documents";
import { deduplicateFiles, getRoom } from "../modules/documents";

import { SettingsContext } from "./Contexts";
import styles from "./FilesList.module.css";

export const FilesList = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const handleDelete = () => {
    if (!fileName) return;
    const confirmation = confirm(
      `Are you sure you want to delete ${fileName}?`
    );
    if (confirmation) {
      const room = settings.rooms.find(
        ({ id }) => id === settings.activeRoomId
      );
      if (!room) return;
      const { files, ydoc } = getRoom(room.id, room.password);
      const index = (files.toJSON() as FileMetaData[]).findIndex(
        ({ name }) => name === fileName
      );
      const text = getDocument(room.id, ydoc, fileName);
      text.delete(0, text.length);
      if (files.length > 1) {
        files.delete(index, 1);
      }
      const newIndex = index >= files.length ? files.length - 1 : index;
      setSearchParams({ name: files.get(newIndex).name });
    }
  };
  return (
    <section className={styles.fileslist}>
      <div className={styles.headingBar}>
        <h2>Files</h2>
        <button onClick={handleDelete}>
          <VscTrash />
        </button>
      </div>
      <FileNamesList />
    </section>
  );
};
const FileNamesList = () => {
  const { settings } = React.useContext(SettingsContext);
  const [filesData, setFilesData] = React.useState<FileMetaData[]>([]);
  React.useLayoutEffect(() => {
    const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
    if (!room) return;
    const { files } = getRoom(room.id, room.password);
    deduplicateFiles(files);
    setFilesData(files.toArray());
    const changeListener = () => {
      deduplicateFiles(files);
      setFilesData(files.toArray());
    };
    files.observe(changeListener);
    return () => {
      files.unobserve(changeListener);
    };
  }, []);

  return (
    <ul>
      {filesData.map(({ lastUpdated, name }) => (
        <li key={name}>
          <Link
            className={styles.filesListItem}
            to={`files?name=${encodeURIComponent(name)}`}
          >
            <div className={styles.file}>
              <FileTypeIcon name={name} />
              <div className={styles.fileDetails}>
                <h3 className={styles.fileName}>{name}</h3>
                <p className={styles.subtitle}>
                  {dateTimeFormatter(lastUpdated)}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
      <li>
        <NewFile />
      </li>
    </ul>
  );
};

function dateTimeFormatter(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(+date - +now);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours > 12) {
    return date.toLocaleDateString();
  } else {
    return date.toLocaleTimeString();
  }
}

const FileTypeIcon: React.FC<{ name: string }> = ({ name }) => {
  const match = /(\.\w+)$/g.exec(name);
  if (!match) return <SiFiles />;
  switch (name) {
    case ".md":
      return <SiMarkdown />;
    case ".ts":
    case ".tsx":
      return <SiTypescript />;
    case ".js":
    case ".jsx":
    case ".mjs":
      return <SiJavascript />;
    case ".rs":
      return <SiRust />;
    case ".css":
      return <SiCss3 />;
    case ".html":
      return <SiHtml5 />;
    case ".json":
      return <SiJson />;
    case ".sc":
    case ".scala":
      return <SiScala />;
    default:
      return <SiFiles />;
  }
};

const NewFile: React.FC = () => {
  const [isNewFileInput, setIsNewFileInput] = React.useState(false);
  const [, setSearchParams] = useSearchParams();
  const { settings } = React.useContext(SettingsContext);
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId)!;
  if (!room) return null;
  const { files } = getRoom(room.id, room.password);
  const handleNewFileFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleNewFile(e.currentTarget.value.trim());
  };
  const handleNewFile = (name: string) => {
    setIsNewFileInput(false);
    if (name) {
      const now = new Date().toISOString();
      files.push([
        {
          name,
          tags: [],
          lastUpdated: now,
          dateCreated: now,
        },
      ]);
      setSearchParams({ name });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleNewFile(e.currentTarget.value.trim());
      case "Escape":
        setIsNewFileInput(false);
        return;
    }
  };

  if (!isNewFileInput) {
    return (
      <button
        className={styles.newFileButton}
        onClick={() => setIsNewFileInput(true)}
      >
        <VscNewFile />
        New file
      </button>
    );
  }
  return (
    <input
      className={styles.newFileInput}
      onKeyDown={handleKeyDown}
      onBlur={handleNewFileFocus}
      autoFocus
    />
  );
};
