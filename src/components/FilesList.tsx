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
import { Link, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { cn, dateTimeFormatter } from "@/modules/utils";

import { createNewFile } from "../modules/documents";

import styles from "./FilesList.module.css";
import { filesDataState } from "./data-model";
import { routesHelper } from "./navigation-utils";
import { useFileName, useFileNameState, useRoom } from "./utils";

export const FilesList = () => {
  const fileName = useFileName();
  const room = useRoom();
  const filesData = useRecoilValue(filesDataState);

  return (
    <ul>
      {filesData.map(({ lastUpdated, name }) => (
        <li key={name}>
          <Link
            className={cn(
              styles.filesListItem,
              fileName === name && styles.highlight,
            )}
            to={routesHelper.room(room.id).files(name)}
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
  const ext = /(?<ext>\.\w+)$/g.exec(name)?.groups?.["ext"];
  if (!ext) return <SiFiles />;
  switch (ext) {
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
  const room = useRoom();
  const [, setSearchParams] = useSearchParams();
  const [, setFileName] = useFileNameState();
  const handleNewFileFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    handleNewFile(e.currentTarget.value.trim());
  };
  const handleNewFile = (name: string) => {
    setIsNewFileInput(false);
    if (name) {
      createNewFile(room.id, room.password, name);
      setFileName(name);
      setSearchParams({ name });
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        return handleNewFile(e.currentTarget.value.trim());
      case "Escape":
        setIsNewFileInput(false);
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
