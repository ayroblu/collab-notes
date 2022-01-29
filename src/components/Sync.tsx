import isEqual from "lodash/isEqual";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  deduplicateFiles,
  getAllFilesMetaData,
  getComments,
  getRoom,
  syncCommentNamesFn,
} from "@/modules/documents";

import type { Settings } from "./data-model";
import {
  activeRoomIdState,
  filesDataState,
  savedSettingsSelector,
  settingsState,
} from "./data-model";
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
  const [settings, setSettings] = useRecoilState(settingsState);
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
  const settings = useRecoilValue(settingsState);
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

export const SetupSync: React.FC = () => {
  useInitSync();
  return null;
};

export const useInitSync = () => {
  const [settings, setSettings] = useRecoilState(settingsState);
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);

  const savedSettings = useRecoilValue(savedSettingsSelector);
  const setParamsSettings = useParamSettingsSync(savedSettings || settings);
  useBroadcastSync(setSettingsLocal);
  if (savedSettings && !isEqual(savedSettings, settings)) {
    setSettings(savedSettings);
  }

  React.useEffect(() => {
    setParamsSettings();
  }, []);
};

const useParamSettingsSync = (settings: Settings) => {
  const setSettings = useSetRecoilState(settingsState);
  const [searchParams] = useSearchParams();
  const paramRoomId = searchParams.get("id");
  const paramRoomName = searchParams.get("groupName");
  const paramRoomPassword = searchParams.get("password");
  const paramFileName = searchParams.get("name");
  const [, setActiveRoomId] = useRecoilState(activeRoomIdState);

  if (!paramRoomId || !paramFileName) {
    return null;
  }
  return () => {
    const rooms = settings.rooms;
    if (!rooms.find(({ id }) => id === paramRoomId)) {
      setSettings({
        ...settings,
        rooms: [
          ...rooms,
          {
            id: paramRoomId,
            name: paramRoomName || "",
            password: paramRoomPassword || paramRoomId,
          },
        ],
      });
      setActiveRoomId(paramRoomId);
      return;
    }
  };
  return;
};
// function useSetupFunc(
//   settings: Settings,
//   setSettings: (settings: Settings) => void
// ) {
//   const [searchParams] = useSearchParams();
//   const paramRoomId = searchParams.get("id");
//   const paramRoomName = searchParams.get("groupName");
//   const paramRoomPassword = searchParams.get("password");
//   const paramFileName = searchParams.get("name");
//   const navigate = useNavigate();
//   const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);
//   const func = React.useCallback(async () => {
//     // if route params -> add room to rooms list and switch
//     // If new user -> create new room + readme.md
//     const savedSettings: Settings | void = await idbGetWithMigrations();
//     if (paramRoomId && paramFileName) {
//       const rooms = savedSettings?.rooms || settings.rooms;
//       if (!rooms.find(({ id }) => id === paramRoomId)) {
//         setSettings({
//           ...(savedSettings || settings),
//           rooms: [
//             ...rooms,
//             {
//               id: paramRoomId,
//               name: paramRoomName || "",
//               password: paramRoomPassword || paramRoomId,
//             },
//           ],
//         });
//         setActiveRoomId(paramRoomId);
//         return;
//       }
//     }
//     if (!savedSettings || !savedSettings.rooms.length) {
//       const roomId = activeRoomId;
//       const roomName = getRandomName();
//       setSettings({
//         ...settings,
//         rooms: [
//           ...settings.rooms,
//           {
//             id: roomId,
//             name: getRandomName(),
//             password: roomId,
//           },
//         ],
//       });
//       const { name } = getRoom(roomId, roomId);
//       name.insert(0, roomName);
//       navigate({
//         pathname: "/files",
//         search: `?${createSearchParams({
//           name: "README.md",
//           id: roomId,
//           newUser: "1",
//         })}`,
//       });
//       return;
//     }
//     setSettings(savedSettings);
//     const room = savedSettings.rooms[0];
//     if (!room) return;
//     const { initialDbPromise } = getRoom(room.id, room.password);
//     await initialDbPromise;
//   }, []);
//   return func;
// }
