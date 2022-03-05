import React from "react";
import { VscNewFolder, VscTrash } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  applyDiffToYText,
  getRoom,
  getYFileMetaData,
} from "@/modules/documents";
import {
  cn,
  dateTimeFormatter,
  generatePassword,
  sortBy,
} from "@/modules/utils";

import styles from "./RoomsList.module.css";
import type { Room } from "./data-model";
import {
  activeRoomIdSelector,
  roomNamesState,
  settingsSelector,
} from "./data-model";
import { routesHelper, useSetActiveRoomId } from "./navigation-utils";

export const RoomsList = () => {
  const settings = useRecoilValue(settingsSelector);
  const [isEdit, setIsEdit] = React.useState(false);

  const orderedRooms = settings.rooms
    .concat()
    .sort(sortBy([(room) => getLastUpdated(room)], ["desc"]));
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
        {orderedRooms.map((room) => (
          <li key={room.id}>
            <ListButton isEdit={isEdit} room={room} />
          </li>
        ))}
        <li>
          <NewRoomButton />
        </li>
      </ul>
    </section>
  );
};

const ListButton: React.FC<{ room: Room; isEdit: boolean }> = ({
  isEdit,
  room: { id, password },
}) => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const [isNameEdit, setIsNameEdit] = React.useState(false);
  const [activeRoomId] = useRecoilState(activeRoomIdSelector);
  const setActiveRoomId = useSetActiveRoomId();
  const name = useRecoilValue(roomNamesState({ id, password }));

  React.useEffect(() => {
    if (isNameEdit && !isEdit) {
      setIsNameEdit(false);
    }
  }, [isNameEdit, isEdit]);

  const makeRoomActiveHandler = (id: string) => () => {
    setActiveRoomId(id);
  };
  const { name: yname } = getRoom(id, password);
  const setRoomName = (text: string) => {
    applyDiffToYText(yname, () => text);
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
      const newRooms = settings.rooms.filter((room) => room.id !== id);
      const newActiveRoomId =
        id === activeRoomId
          ? newRooms[index]
            ? newRooms[index]!.id
            : newRooms.length
            ? newRooms[newRooms.length - 1]!.id
            : generatePassword()
          : activeRoomId;

      setSettings({
        ...settings,
        rooms: newRooms,
      });
      setActiveRoomId(newActiveRoomId);
    }
  };

  return (
    <div className={styles.roomButtonWrapper}>
      <button
        className={cn(styles.roomButton, activeRoomId === id && styles.active)}
        onClick={isEdit ? () => setIsNameEdit(true) : makeRoomActiveHandler(id)}
      >
        {isEdit && isNameEdit ? (
          <input
            autoFocus
            className={styles.input}
            onBlur={() => setIsNameEdit(false)}
            onChange={(e) => setRoomName(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            value={yname.toString()}
          />
        ) : (
          name || id
        )}
        <p className={styles.subtitle}>{getSubtitle({ id, password })}</p>
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
  if (!numFiles) {
    return `${numFiles} files`;
  }
  const lastUpdated = getLastUpdated(room);
  const formattedDateTime = dateTimeFormatter(new Date(lastUpdated));
  return `${formattedDateTime} - ${numFiles} files`;
}
function getLastUpdated(room: Room): number {
  const { files } = getRoom(room.id, room.password);
  return Math.max(
    ...files
      .map((file) => getYFileMetaData(file).lastUpdated)
      .map((lastUpdated) => new Date(lastUpdated!).getTime()),
  );
}

const NewRoomButton: React.FC = () => {
  const setSettings = useSetRecoilState(settingsSelector);
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);
  const navigate = useNavigate();

  const handleNewRoom = () => {
    const roomId = generatePassword();
    setSettings((settings) => ({
      ...settings,
      rooms: [
        ...settings.rooms,
        {
          id: roomId,
          password: roomId,
        },
      ],
    }));
    setActiveRoomId(roomId);
    navigate(routesHelper.room(roomId).index);
  };

  return (
    <button className={styles.newRoomButton} onClick={() => handleNewRoom()}>
      <VscNewFolder />
      New Group
    </button>
  );
};
