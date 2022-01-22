import React from "react";
import {
  SiCss3,
  SiFiles,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiRuby,
  SiRust,
  SiScala,
  SiTypescript,
} from "react-icons/si";
import { VscNewFile } from "react-icons/vsc";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";

import { cn, dateTimeFormatter } from "@/modules/utils";

import type { FileMetaData } from "../modules/documents";
import { deduplicateFiles, getRoom } from "../modules/documents";

import { SettingsContext } from "./Contexts";
import styles from "./FilesList.module.css";

export const FilesList = () => {
  const { settings } = React.useContext(SettingsContext);
  const [filesData, setFilesData] = React.useState<FileMetaData[]>([]);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  React.useLayoutEffect(() => {
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
  if (!room) {
    return null;
  }

  return (
    <ul>
      {filesData.map(({ lastUpdated, name }) => (
        <li key={name}>
          <Link
            className={cn(
              styles.filesListItem,
              fileName === name && styles.highlight
            )}
            to={`files?${createSearchParams({ name, id: room.id })}`}
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

const FileTypeIcon: React.FC<{ name: string }> = ({ name }) => {
  const match = /(\.\w+)$/g.exec(name);
  if (!match) return <SiFiles />;
  switch (match[1]) {
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
    case ".rb":
      return <SiRuby />;
    case ".css":
      return <SiCss3 />;
    case ".html":
      return <SiHtml5 />;
    case ".json":
      return <SiJson />;
    case ".sc":
    case ".scala":
      return <SiScala />;
    case ".sh":
      return <SiGnubash />;
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
