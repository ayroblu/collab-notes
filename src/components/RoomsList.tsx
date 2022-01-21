import React from "react";
import { VscTrash } from "react-icons/vsc";
import { createSearchParams, useNavigate } from "react-router-dom";

import { getRoom } from "@/modules/documents";
import { cn, dateTimeFormatter } from "@/modules/utils";

import type { Room } from "./Contexts";
import { SettingsContext } from "./Contexts";
import styles from "./RoomsList.module.css";

export const RoomsList = () => {
  useSettingsRoomsSync();
  const { settings } = React.useContext(SettingsContext);
  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <section>
      <div className={styles.headingBar}>
        <h2 className={styles.heading}>Groups</h2>
        {isEdit ? (
          <button onClick={() => setIsEdit(false)}>Done</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
      <ul>
        {settings.rooms.map((room) => (
          <li key={room.id}>
            <ListButton room={room} isEdit={isEdit} />
          </li>
        ))}
      </ul>
    </section>
  );
};

const ListButton: React.FC<{ room: Room; isEdit: boolean }> = ({
  isEdit,
  room: { id, name, password },
}) => {
  const { setSettings, settings } = React.useContext(SettingsContext);
  const [isNameEdit, setIsNameEdit] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isNameEdit && !isEdit) {
      setIsNameEdit(false);
    }
  });

  const makeRoomActiveHandler = (id: string, password: string) => () => {
    setSettings({ ...settings, activeRoomId: id });
    const { files } = getRoom(id, password);
    const file = files.slice(0, 1)[0];
    navigate({
      pathname: "files",
      search: `?${createSearchParams({ name: file?.name || "README.md", id })}`,
    });
  };
  const { name: yname } = getRoom(id, password);
  const setRoomName = (text: string) => {
    yname.delete(0, yname.length);
    yname.insert(0, text);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
      case "Escape":
        return setIsNameEdit(false);
    }
  };
  const handleDelete = () => {
    const confirmation = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmation) {
      const index = settings.rooms.findIndex((room) => room.id === id);
      const newRooms = settings.rooms.filter((room) => room.name !== name);
      const newActiveRoomId =
        id === settings.activeRoomId
          ? newRooms[index]
            ? newRooms[index]!.id
            : newRooms.length
            ? newRooms[newRooms.length - 1]!.id
            : null
          : settings.activeRoomId;

      setSettings({
        ...settings,
        rooms: newRooms,
        activeRoomId: newActiveRoomId,
      });
    }
  };

  return (
    <div className={styles.roomButtonWrapper}>
      <button
        className={cn(
          styles.roomButton,
          settings.activeRoomId === id && styles.active
        )}
        onClick={
          isEdit
            ? () => setIsNameEdit(true)
            : makeRoomActiveHandler(id, password)
        }
      >
        {isEdit && isNameEdit ? (
          <input
            className={styles.input}
            value={yname.toString()}
            onChange={(e) => setRoomName(e.currentTarget.value)}
            onBlur={() => setIsNameEdit(false)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          name
        )}
        <p className={styles.subtitle}>{getSubtitle({ id, name, password })}</p>
      </button>
      {isEdit && !isNameEdit && (
        <button className={styles.hoverDelete} onClick={handleDelete}>
          <VscTrash />
        </button>
      )}
    </div>
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
