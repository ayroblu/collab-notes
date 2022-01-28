import { atom } from "recoil";

import type { LeftNavEnum, Room, SelectionRange } from "./types";

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});
export const roomState = (id: string) =>
  atom<Room>({
    key: `roomsState-${id}`,
    default: { id, name: "", password: "" },
  });
export const activeRoomIdState = atom<string | null>({
  key: "activeRoomIdState",
  default: null,
});

export const leftNavState = atom<LeftNavEnum | null>({
  key: "leftNavState",
  default: null,
});

export const inProgressSelectionsState = atom<SelectionRange[]>({
  key: "inProgressSelectionsState",
  default: [],
});
