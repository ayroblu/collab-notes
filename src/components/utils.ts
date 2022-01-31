import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { getNonNullable } from "@/modules/utils";

import {
  activeFileNameState,
  activeRoomIdSelector,
  commentsState,
  focusCommentIdState,
  settingsSelector,
} from "./data-model";

export const useRoom = () => {
  const settings = useRecoilValue(settingsSelector);
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  return settings.rooms.find(({ id }) => id === activeRoomId);
};

export const useFileName = () => {
  const room = useRoom();
  return useRecoilValue(activeFileNameState(getNonNullable(room).id));
};

export const useFileNameState = () => {
  const room = useRoom();
  return useRecoilState(activeFileNameState(getNonNullable(room).id));
};

export const useComments = () => {
  const fileName = useFileName();
  const room = useRoom();
  return useRecoilValue(
    commentsState({ fileName, roomId: getNonNullable(room).id })
  );
};

export const useSetComments = () => {
  const fileName = useFileName();
  const room = useRoom();
  return useSetRecoilState(
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
