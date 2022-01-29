import { useRecoilState, useRecoilValue } from "recoil";

import { getNonNullable } from "@/modules/utils";

import {
  activeFileNameState,
  activeRoomIdState,
  commentsState,
  focusCommentIdState,
  settingsState,
} from "./data-model";

export const useRoom = () => {
  const settings = useRecoilValue(settingsState);
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
