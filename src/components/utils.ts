import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { getNonNullable } from "@/modules/utils";

import {
  activeFileNameState,
  activeRoomIdSelector,
  commentsState,
  focusCommentIdState,
  settingsSelector,
  showCommentsState,
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
  const { fileName, roomId } = useFileParams();
  const showComments = useRecoilValue(showCommentsState({ fileName, roomId }));
  const comments = useRecoilValue(commentsState({ fileName, roomId }));
  return React.useMemo(() => {
    // return comments.filter(({ isResolved }) => isResolved ? showResolvedComments : showOpenComments)
    switch (showComments) {
      case "open":
        return comments.filter(({ isResolved }) => !isResolved);
      case "resolved":
        return comments.filter(({ isResolved }) => isResolved);
    }
  }, [comments, showComments]);
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
