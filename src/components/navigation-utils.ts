import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { useStable } from "@/hooks/useStable";

import { activeRoomIdSelector } from "./data-model";

export const useSetActiveRoomId = () => {
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);
  const navigate = useStableNavigate();

  return React.useCallback(
    (roomId: string) => {
      setActiveRoomId(roomId);
      navigate(routesHelper.room(roomId).index);
    },
    [navigate, setActiveRoomId],
  );
};

export const routesHelper = {
  room: (roomId: string) => ({
    index: `/${roomId}`,
    files: (fileName: string) =>
      `/${roomId}/files?${createSearchParams({ name: fileName })}`,
  }),
  settings: "/settings",
};

export const useStableNavigate = () => {
  const navigate = useNavigate();
  return useStable(navigate);
};
