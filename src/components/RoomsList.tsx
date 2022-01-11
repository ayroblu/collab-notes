import React from "react";

import { getRoom } from "../modules/documents";

import { SettingsContext } from "./Contexts";

export const RoomsList = () => {
  const { settings, setSettings } = React.useContext(SettingsContext);
  React.useEffect(() => {
    const roomNames = settings.rooms.map(
      ({ id, password }) => getRoom(id, password).name
    );

    setSettings({
      ...settings,
      rooms: settings.rooms.map(({ id, password }, i) => ({
        id,
        name: roomNames[i]!.toString(),
        password,
      })),
    });
    const changeListener = () => {
      setSettings({
        ...settings,
        rooms: settings.rooms.map(({ id, password }, i) => ({
          id,
          name: roomNames[i]!.toString(),
          password,
        })),
      });
    };
    roomNames.forEach((t) => {
      t.observe(changeListener);
    });
    return () => {
      roomNames.forEach((t) => {
        t.unobserve(changeListener);
      });
    };
  }, [settings.rooms.length]);
  if (settings.rooms.length < 2) {
    return null;
  }

  return (
    <section>
      <h2>Rooms</h2>
      <ul>
        {settings.rooms.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </section>
  );
};
