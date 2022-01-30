import React from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useStable } from "@/hooks/useStable";
import {
  deduplicateFiles,
  getAllFilesMetaData,
  getComments,
  getRoom,
  syncCommentNamesFn,
} from "@/modules/documents";

import {
  activeFileNameState,
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

export const ParamsSync: React.FC = () => {
  useParamsSync();
  return null;
};
const useParamsSync = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);
  const setActiveFileName = useSetRecoilState(activeFileNameState(roomId));

  React.useLayoutEffect(() => {
    if (roomId) {
      setActiveRoomId(roomId);
      if (fileName) {
        setActiveFileName(fileName);
      }
    }
  }, [fileName, roomId, setActiveRoomId, setActiveFileName]);
};

export const SetupSync: React.FC = ({ children }) => {
  const settings = useRecoilValue(settingsSelector);
  useRecoilValue(yRoomSelector);
  useSetupParamsSync();

  if (!settings.rooms.length) {
    return null;
  }
  return <>{children}</>;
};

const useSetupParamsSync = () => {
  const [settings, setSettings] = useRecoilState(settingsSelector);
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigateStable = useStable(navigate, [roomId]);
  const activeFileName = useRecoilValue(activeFileNameState(roomId));

  React.useEffect(() => {
    if (!roomId && settings.rooms.length) {
      navigateStable(
        `${activeRoomId}/files?${createSearchParams({ name: activeFileName })}`
      );
      return;
    } else if (roomId && !searchParams.get("name")) {
      setSearchParams({ name: activeFileName });
    }
  }, [
    roomId,
    navigateStable,
    settings.rooms.length,
    activeRoomId,
    searchParams,
    activeFileName,
    setSearchParams,
  ]);

  React.useEffect(() => {
    const paramRoomPassword = searchParams.get("password");

    if (!roomId) {
      return;
    }
    const rooms = settings.rooms;
    if (!rooms.find(({ id }) => id === roomId)) {
      setSettings((settings) => ({
        ...settings,
        rooms: [
          ...rooms,
          {
            id: roomId,
            password: paramRoomPassword || roomId,
          },
        ],
      }));
      return;
    }
  }, [roomId, searchParams, setSettings, settings.rooms]);
  return;
};
