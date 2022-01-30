import { atom, atomFamily, selector } from "recoil";

import type { CommentData, FileMetaData } from "@/modules/documents";
import { getRoom } from "@/modules/documents";

import { settingsSelector } from "./settings";
import type { Room } from "./types";

export * from "./selectors";
export * from "./settings";
export * from "./types";

const activeRoomIdState = atom<string>({
  key: "activeRoomIdState",
  default: selector<string>({
    key: "defaultActiveRoomIdSelector",
    get: ({ get }) => {
      const settings = get(settingsSelector);
      if (!settings.rooms.length) return "";
      return settings.rooms[0]!.id;
    },
  }),
});
/**
 * This is reflected in the url, make sure to set the route at the same time
 */
export const activeRoomIdSelector = selector<string>({
  key: "activeRoomIdSelector",
  get: ({ get }) => {
    const activeRoomId = get(activeRoomIdState);
    const settings = get(settingsSelector);
    if (!settings.rooms.length) return activeRoomId;
    const room = settings.rooms.find(({ id }) => id === activeRoomId);
    if (!room) {
      return settings.rooms[0]!.id;
    }
    return activeRoomId;
  },
  set: ({ set }, newValue) => {
    set(activeRoomIdState, newValue);
  },
});

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});

export const roomNamesState = atomFamily<string, Room>({
  key: "roomNamesState",
  default: "",
  effects: ({ id, password }) => [
    ({ setSelf }) => {
      const { name } = getRoom(id, password);
      setSelf(name.toString());

      const changeListener = () => {
        setSelf(name.toString());
      };
      name.observe(changeListener);
      return () => {
        name.unobserve(changeListener);
      };
    },
  ],
});

type RoomId = string;
/**
 * This is reflected in the url, make sure to set the route at the same time
 */
export const activeFileNameState = atomFamily<
  string,
  RoomId | null | undefined
>({
  key: "activeFileNameState",
  default: () => "Untitled",
});

export const filesDataState = atom<FileMetaData[]>({
  key: "filesDataState",
  default: [],
});

export const isNewUserState = atom<boolean>({
  key: "isNewUserState",
  default: false,
});

export const inProgressCommentsState = atomFamily<
  CommentData[],
  { fileName: string; roomId: string }
>({
  key: "inProgressCommentsState",
  default: () => [] as CommentData[],
});

export const commentsState = atomFamily<
  CommentData[],
  { fileName: string; roomId: string }
>({
  key: "commentsState",
  default: () => [] as CommentData[],
});

export const focusCommentIdState = atomFamily<
  string | null,
  { fileName: string; roomId: string }
>({
  key: "focusCommentIdState",
  default: () => null,
});
