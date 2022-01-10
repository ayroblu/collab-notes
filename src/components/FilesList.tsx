import React from "react";
import { Link } from "react-router-dom";
import { deduplicateFiles, getRoom } from "../modules/documents";
import { SettingsContext } from "./Contexts";

export const FilesList = () => {
  return (
    <section>
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
    </ul>
  );
};
type File = {
  name: string;
  tags: string[];
};
