import React from "react";
import { Link } from "react-router-dom";
import { getRoom } from "../modules/documents";
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
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  if (!room) return null;
  const { files } = getRoom(room.id, room.password);
  return (
    <ul>
      {files.map(({ name }) => (
        <li key={name}>
          <Link to={`files?name=${encodeURIComponent(name)}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
