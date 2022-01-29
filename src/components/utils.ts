import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { getNonNullable } from "@/modules/utils";

import { SettingsContext } from "./Contexts";
import { activeFileNameState, activeRoomIdState } from "./data-model";

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
