import React from "react";
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
      {files.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};
