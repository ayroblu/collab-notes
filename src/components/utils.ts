import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { getNonNullable } from "@/modules/utils";

import { SettingsContext } from "./Contexts";
import {
  activeFileNameState,
  activeRoomIdState,
  commentsState,
  focusCommentIdState,
} from "./data-model";

export const useRoom = () => {
  const { settings } = React.useContext(SettingsContext);
  const activeRoomId = useRecoilValue(activeRoomIdState);
  return settings.rooms.find(({ id }) => id === activeRoomId);
};

export const useFileName = () => {
  const room = useRoom();
  return useRecoilValue(
    activeFileNameState({ roomId: getNonNullable(room).id })
  );
};

export const useFileNameState = () => {
  const room = useRoom();
  return useRecoilState(
    activeFileNameState({ roomId: getNonNullable(room).id })
  );
};

export const useComments = () => {
  const fileName = useFileName();
  const room = useRoom();
  return useRecoilValue(
    commentsState({ fileName, roomId: getNonNullable(room).id })
  );
};

export const useCommentsState = () => {
  const fileName = useFileName();
  const room = useRoom();
  return useRecoilState(
    commentsState({ fileName, roomId: getNonNullable(room).id })
  );
};

export const useFocusCommentIdState = () => {
  const fileName = useFileName();
  const room = useRoom();
  return useRecoilState(
    focusCommentIdState({ fileName, roomId: getNonNullable(room).id })
  );
};
