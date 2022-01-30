import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  deduplicateFiles,
  getAllFilesMetaData,
  getComments,
  getRoom,
  syncCommentNamesFn,
} from "@/modules/documents";
import { getRandomName } from "@/modules/utils";

import {
  activeFileNameState,
  activeRoomIdSelector,
  filesDataState,
  settingsSelector,
  yRoomSelector,
} from "./data-model";
import { routesHelper, useStableNavigate } from "./navigation-utils";
import { useCommentsState, useFileName, useRoom } from "./utils";

/**
 * This component exists to sync state from yjs
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
  const [settings, setSettings] = useRecoilState(settingsSelector);

  React.useEffect(() => {
    if (!room) return;
    const { files } = getRoom(room.id, room.password);
    const didDedup = deduplicateFiles(files);
    console.log("init diddedup", didDedup);

    const filesMetaData = getAllFilesMetaData(room.id, room.password);
    setFilesData(filesMetaData);
    const changeListener = () => {
      const didDedup = deduplicateFiles(files);
      const filesMetaData = getAllFilesMetaData(room.id, room.password);
      setFilesData(filesMetaData);
      console.log("diddedup", didDedup);
      if (didDedup) {
        setSettings({ ...settings });
      }
    };
    files.observe(changeListener);
    return () => {
      files.unobserve(changeListener);
    };
  }, [room, setFilesData, setSettings, settings]);
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

export const ParamsSync: React.FC = () => {
  useParamsSync();
  return null;
};
const useParamsSync = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdSelector);

  React.useEffect(() => {
    if (roomId && roomId !== activeRoomId) {
      setActiveRoomId(roomId);
    }
  }, [activeRoomId, roomId, setActiveRoomId]);
};
export const FilesParamsSync: React.FC = ({ children }) => {
  useFileNameInitSync();
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const activeFileName = useRecoilValue(activeFileNameState(roomId));

  if (!fileName || fileName !== activeFileName) return null;
  return <>{children}</>;
};
const useFileNameInitSync = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const filesData = useRecoilValue(filesDataState);
  const [activeFileName, setActiveFileName] = useRecoilState(
    activeFileNameState(roomId)
  );
  const fileName = searchParams.get("name");

  React.useEffect(() => {
    if (!fileName) {
      const name = filesData[0]?.name ?? "README.md";
      setSearchParams({ name });
    } else if (activeFileName !== fileName) {
      setActiveFileName(fileName);
    }
  }, [activeFileName, fileName, filesData, setActiveFileName, setSearchParams]);
};

export const SetupSync: React.FC = ({ children }) => {
  const settings = useRecoilValue(settingsSelector);
  useRecoilValue(yRoomSelector);
  useSetupNewRoomSync();

  if (!settings.rooms.length) {
    return null;
  }
  return <>{children}</>;
};

const useSetupNewRoomSync = () => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);
  const setActiveFileName = useSetRecoilState(activeFileNameState(roomId));

  React.useEffect(() => {
    const paramRoomPassword = searchParams.get("password");

    if (!roomId) {
      return;
    }
    const room = settings.rooms.find(({ id }) => id === roomId);
    if (room) return;

    setSettings((settings) => ({
      ...settings,
      rooms: [
        ...settings.rooms,
        {
          id: roomId,
          password: paramRoomPassword || roomId,
        },
      ],
    }));
    setActiveRoomId(roomId);
    setActiveFileName("README.md");
    return;
  }, [
    roomId,
    searchParams,
    setActiveFileName,
    setActiveRoomId,
    setSettings,
    settings.rooms,
  ]);
  return;
};
