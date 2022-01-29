import React from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  deduplicateFiles,
  getAllFilesMetaData,
  getComments,
  getRoom,
  syncCommentNamesFn,
} from "@/modules/documents";

import { SettingsContext } from "./Contexts";
import { activeRoomIdState, filesDataState } from "./data-model";
import { useCommentsState, useFileName, useRoom } from "./utils";

/**
 * This component exists to sync state from yjs, url data with internal state
 */
export const Sync: React.FC = () => {
  useFilesListSync();
  useSettingsRoomNamesSync();
  useCommentsSync();
  useCommentNamesSync();

  return null;
};

const useFilesListSync = () => {
  const setFilesData = useSetRecoilState(filesDataState);
  const room = useRoom();

  React.useLayoutEffect(() => {
    if (!room) return;
    const { files } = getRoom(room.id, room.password);
    deduplicateFiles(files);

    const filesMetaData = getAllFilesMetaData(room.id, room.password);
    setFilesData(filesMetaData);
    const changeListener = () => {
      const filesMetaData = getAllFilesMetaData(room.id, room.password);
      deduplicateFiles(files);
      setFilesData(filesMetaData);
    };
    files.observe(changeListener);
    return () => {
      files.unobserve(changeListener);
    };
  }, [room, setFilesData]);
};

const useSettingsRoomNamesSync = () => {
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
  }, [setSettings, settings, settings.rooms.length]);
};

const useCommentsSync = () => {
  const fileName = useFileName();
  const room = useRoom();
  const [comments, setComments] = useCommentsState();

  React.useEffect(() => {
    if (!room) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;

    setComments(yComments.toArray());

    const changeListener = () => {
      setComments(yComments.toArray());
    };
    yComments.observe(changeListener);
    return () => {
      yComments.unobserve(changeListener);
    };
  }, [fileName, room, setComments]);

  return comments;
};

const useCommentNamesSync = () => {
  const { settings } = React.useContext(SettingsContext);
  const room = useRoom();
  const fileName = useFileName();

  React.useEffect(() => {
    if (!room) return;
    const yComments = getComments(room.id, room.password, fileName);
    if (!yComments) return;

    syncCommentNamesFn(
      room.id,
      room.password,
      fileName
    )(settings.id, settings.name);
  }, [settings.name, fileName, room, settings.id]);
};

export const FileSearchParamsSync: React.FC = () => {
  useSearchParamsSync();
  return null;
};
const useSearchParamsSync = () => {
  const room = useRoom();
  const fileName = useFileName();
  const [, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (!room) return;
    const password = room.id !== room.password ? room.password : undefined;
    if (password) {
      setSearchParams({ id: room.id, name: fileName, password });
    } else {
      setSearchParams({ id: room.id, name: fileName });
    }
  }, [room, fileName, setSearchParams]);
};

// export const useInitSync = () => {
//   const [searchParams] = useSearchParams();
//   const paramRoomId = searchParams.get("id");
//   const paramRoomName = searchParams.get("groupName");
//   const paramRoomPassword = searchParams.get("password");
//   const paramFileName = searchParams.get("name");
//   const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);

//   React.useEffect(() => {
//     // TODO
//   }, []);
// };
