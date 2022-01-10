import React from "react";
import { getRoom } from "../modules/documents";
import { SettingsContext } from "./Contexts";

export const RoomsList = () => {
  const { settings } = React.useContext(SettingsContext);
  const [rooms, setRooms] = React.useState<string[]>([]);
  React.useEffect(() => {
    const roomNames = settings.rooms.map(
      ({ id, password }) => getRoom(id, password).name
    );

    setRooms(roomNames.map((t) => t.toString()));
    const changeListener = () => {
      setRooms(roomNames.map((t) => t.toString()));
    };
    roomNames.forEach((t) => {
      t.observe(changeListener);
    });
    return () => {
      roomNames.forEach((t) => {
        t.unobserve(changeListener);
      });
    };
  }, []);
  if (settings.rooms.length < 2) {
    return null;
  }

  return (
    <section>
      <h2>Rooms</h2>
      <ul>
        {settings.rooms.map(({ id }, i) => (
          <li key={id}>{rooms[i]}</li>
        ))}
      </ul>
    </section>
  );
};
