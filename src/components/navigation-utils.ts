import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useStable } from "@/hooks/useStable";

import { activeFileNameState, activeRoomIdSelector } from "./data-model";

export const useSetActiveRoomId = () => {
  const setActiveRoomId = useSetRecoilState(activeRoomIdSelector);
  const navigate = useStableNavigate();

  return React.useCallback(
    (roomId: string) => {
      setActiveRoomId(roomId);
      navigate(`/${roomId}`);
    },
    [navigate, setActiveRoomId]
  );
};

export const useSetActiveFileName = () => {
  const activeRoomId = useRecoilValue(activeRoomIdSelector);
  const setActiveFileName = useSetRecoilState(
    activeFileNameState(activeRoomId)
  );
  const navigate = useNavigate();
  const navigateStable = useStable(navigate);

  return React.useCallback(
    (fileName: string) => {
      setActiveFileName(fileName);
      navigateStable(routesHelper.room(activeRoomId).files(fileName));
    },
    [activeRoomId, navigateStable, setActiveFileName]
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
