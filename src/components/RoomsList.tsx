import React from "react";

import { getRoom } from "../modules/documents";

import { SettingsContext } from "./Contexts";

export const RoomsList = () => {
  const { setSettings, settings } = React.useContext(SettingsContext);
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

  const makeRoomActiveHandler = (id: string) => () => {
    setSettings({ ...settings, activeRoomId: id });
  };

  return (
    <section>
      <h2>Groups</h2>
      <ul>
        {settings.rooms.map(({ id, name }) => (
          <li key={id}>
            <button onClick={makeRoomActiveHandler(id)}>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
