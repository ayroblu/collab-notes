import React from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useLayoutEffectOnce } from "@/hooks/useLayoutEffectOnce";
import {
  deduplicateFiles,
  getAllFilesMetaData,
  getComments,
  getRoom,
  syncCommentNamesFn,
} from "@/modules/documents";

import {
  activeRoomIdSelector,
  filesDataState,
  settingsSelector,
  yRoomSelector,
} from "./data-model";
import { useCommentsState, useFileName, useRoom } from "./utils";

/**
 * This component exists to sync state from yjs, url data with internal state
 */
export const Sync: React.FC = () => {
  useFilesListSync();
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
  const settings = useRecoilValue(settingsSelector);
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

export const SetupSync: React.FC = ({ children }) => {
  useParamSettingsSync();
  useAlwaysActiveRoomSync();
  useRecoilValue(yRoomSelector);

  return <>{children}</>;
};

const useParamSettingsSync = () => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const [searchParams] = useSearchParams();
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);

  useLayoutEffectOnce(() => {
    const paramRoomId = searchParams.get("id");
    const paramRoomPassword = searchParams.get("password");
    const paramFileName = searchParams.get("name");

    if (!paramRoomId || !paramFileName) {
      return;
    }
    const rooms = settings.rooms;
    if (!rooms.find(({ id }) => id === paramRoomId)) {
      setSettings({
        ...settings,
        rooms: [
          ...rooms,
          {
            id: paramRoomId,
            password: paramRoomPassword || paramRoomId,
          },
        ],
      });
      setActiveRoomId(paramRoomId);
      return;
    }
  });
  return;
};
const useAlwaysActiveRoomSync = () => {
  const settings = useRecoilValue(settingsSelector);
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdSelector);
  const room = settings.rooms.find(({ id }) => id === activeRoomId);
  if (!room) {
    setActiveRoomId(settings.rooms[0]!.id);
  }
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
//   const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdSelector);
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
