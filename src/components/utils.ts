import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { getNonNullable } from "@/modules/utils";

import {
  activeFileNameState,
  activeRoomIdSelector,
  commentsState,
  focusCommentIdState,
  settingsSelector,
  showOpenCommentsState,
  showResolvedCommentsState,
} from "./data-model";

export const useRoom = () => {
  const settings = useRecoilValue(settingsSelector);
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  return getNonNullable(settings.rooms.find(({ id }) => id === activeRoomId));
};

export const useFileName = () => {
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  return useRecoilValue(activeFileNameState(activeRoomId));
};

export const useFileParams = () => {
  const settings = useRecoilValue(settingsSelector);
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  const room = getNonNullable(
    settings.rooms.find(({ id }) => id === activeRoomId),
  );
  const fileName = useRecoilValue(activeFileNameState(room.id));
  return {
    roomId: room.id,
    roomPassword: room.password,
    fileName,
  };
};

export const useFileNameState = () => {
  const roomId = useRecoilValue(activeRoomIdSelector);
  return useRecoilState(activeFileNameState(roomId));
};

export const useComments = () => {
  const fileName = useFileName();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const showResolvedComments = useRecoilValue(
    showResolvedCommentsState({ fileName, roomId }),
  );
  const showOpenComments = useRecoilValue(
    showOpenCommentsState({ fileName, roomId }),
  );
  const comments = useRecoilValue(commentsState({ fileName, roomId }));
  return React.useMemo(
    () =>
      comments.filter(({ isResolved }) =>
        isResolved ? showResolvedComments : showOpenComments,
      ),
    [comments, showOpenComments, showResolvedComments],
  );
};

export const useAllComments = () => {
  const fileName = useFileName();
  const roomId = useRecoilValue(activeRoomIdSelector);
  return useRecoilValue(commentsState({ fileName, roomId }));
};

export const useSetComments = () => {
  const fileName = useFileName();
  const roomId = useRecoilValue(activeRoomIdSelector);
  return useSetRecoilState(commentsState({ fileName, roomId }));
};

export const useFocusCommentIdState = () => {
  const fileName = useFileName();
  const roomId = useRecoilValue(activeRoomIdSelector);
  return useRecoilState(focusCommentIdState({ fileName, roomId }));
};

export const useSetFocusCommentIdState = () => {
  const fileName = useFileName();
  const roomId = useRecoilValue(activeRoomIdSelector);
  return useSetRecoilState(focusCommentIdState({ fileName, roomId }));
};
