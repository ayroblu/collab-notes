import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { getRoom } from "@/modules/documents";
import { cn, dateTimeFormatter } from "@/modules/utils";

import type { Room } from "./Contexts";
import { SettingsContext } from "./Contexts";
import styles from "./RoomsList.module.css";

export const RoomsList = () => {
  useSettingsRoomsSync();
  const { setSettings, settings } = React.useContext(SettingsContext);
  const navigate = useNavigate();

  const makeRoomActiveHandler = (id: string, password: string) => () => {
    setSettings({ ...settings, activeRoomId: id });
    const { files } = getRoom(id, password);
    const file = files.slice(0, 1)[0];
    navigate({
      pathname: "files",
      search: `?${createSearchParams({ name: file?.name || "README.md", id })}`,
    });
  };

  return (
    <section>
      <h2>Groups</h2>
      <ul>
        {settings.rooms.map(({ id, name, password }) => (
          <li key={id}>
            <button
              className={cn(
                styles.roomButton,
                settings.activeRoomId === id && styles.active
              )}
              onClick={makeRoomActiveHandler(id, password)}
            >
              {name}
              <p className={styles.subtitle}>
                {getSubtitle({ id, name, password })}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

function getSubtitle(room: Room) {
  const { files } = getRoom(room.id, room.password);
  const numFiles = files.length;
  const lastUpdated = Math.max(
    ...files.map(({ lastUpdated }) => new Date(lastUpdated).getTime())
  );
  const formattedDateTime = dateTimeFormatter(new Date(lastUpdated));
  return `${formattedDateTime} - ${numFiles} files`;
}

const useSettingsRoomsSync = () => {
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
};
