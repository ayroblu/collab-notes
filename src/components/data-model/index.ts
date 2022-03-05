import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";

import type {
  CommentData,
  FileMetaData,
  ThreadData,
} from "@/modules/documents";
import { getRoom } from "@/modules/documents";

import { settingsSelector } from "./settings";
import type { Room } from "./types";

export * from "./selectors";
export * from "./settings";
export * from "./types";
export * from "./ui-state";

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

export const filesDataState = atomFamily<FileMetaData[], RoomId>({
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

export const focusCommentIsActiveState = atomFamily<
  boolean,
  { fileName: string; roomId: string }
>({
  key: "focusCommentIsActiveState",
  default: () => false,
});

export const threadState = atomFamily<
  ThreadData[],
  { fileName: string; roomId: string; commentId: string }
>({
  key: "threadState",
  default: () => [],
});
export const threadsSelector = selectorFamily<
  { [commentId: string]: ThreadData[] },
  { fileName: string; roomId: string }
>({
  key: "threadsSelector",
  get:
    ({ fileName, roomId }) =>
    ({ get }) => {
      const comments = get(commentsState({ fileName, roomId }));
      return comments.reduce((result, comment) => {
        result[comment.id] = get(
          threadState({ roomId, fileName, commentId: comment.id }),
        );
        return result;
      }, {} as { [commentId: string]: ThreadData[] });
    },
  set:
    ({ fileName, roomId }) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        return;
      }
      Object.entries(newValue).forEach(([commentId, threadData]) => {
        set(threadState({ fileName, roomId, commentId }), threadData);
      });
    },
});

export const showThreadSaveState = atom<boolean>({
  key: "showThreadSaveState",
  default: false,
});

type CommentId = string;
export const commentTopState = atomFamily<number, CommentId>({
  key: "commentsTopState",
  default: 0,
});
export const commentHeightState = atomFamily<number, CommentId>({
  key: "commentsHeightState",
  default: 0,
});
export const commentCollapsedState = atomFamily<boolean, CommentId>({
  key: "commentsCollapsedState",
  default: false,
});

export const showCommentsState = atomFamily<
  "open" | "resolved",
  { fileName: string; roomId: string }
>({
  key: "showCommentsState",
  default: "open",
});
export const showResolvedCommentsState = atomFamily<
  boolean,
  { fileName: string; roomId: string }
>({
  key: "showResolvedCommentsState",
  default: false,
});
export const showOpenCommentsState = atomFamily<
  boolean,
  { fileName: string; roomId: string }
>({
  key: "showOpenCommentsState",
  default: true,
});
