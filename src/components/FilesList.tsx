import React from "react";
import { Link } from "react-router-dom";

import { deduplicateFiles, getRoom } from "../modules/documents";

import { SettingsContext } from "./Contexts";
import styles from "./FilesList.module.css";

export const FilesList = () => {
  return (
    <section className={styles.fileslist}>
      <h2>Files</h2>
      <FileNamesList />
    </section>
  );
};
const FileNamesList = () => {
  const { settings } = React.useContext(SettingsContext);
  const [filesData, setFilesData] = React.useState<File[]>([]);
  React.useEffect(() => {
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
      {filesData.map(({ name }) => (
        <li key={name}>
          <Link to={`files?name=${encodeURIComponent(name)}`}>{name}</Link>
        </li>
      ))}
      <li>
        <NewFile />
      </li>
    </ul>
  );
};
type File = {
  name: string;
  tags: string[];
};

const NewFile: React.FC = () => {
  const [isNewFileInput, setIsNewFileInput] = React.useState(false);
  const { settings } = React.useContext(SettingsContext);
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId)!;
  if (!room) return null;
  const { files } = getRoom(room.id, room.password);
  const handleNewFile = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsNewFileInput(false);
    const name = e.currentTarget.value.trim();
    if (name) {
      files.push([{ name: e.currentTarget.value, tags: [] }]);
    }
  };

  if (!isNewFileInput) {
    return (
      <button onClick={() => setIsNewFileInput(true)}>➕️ New file</button>
    );
  }
  return <input onBlur={handleNewFile} autoFocus />;
};
