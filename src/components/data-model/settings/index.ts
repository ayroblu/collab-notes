import { atom, DefaultValue, selector } from "recoil";

import { getRoom } from "@/modules/documents";
import { generatePassword, getRandomName } from "@/modules/utils";

import type { Settings } from "..";
import { activeFileNameState, activeRoomIdSelector, isNewUserState } from "..";

import { defaultSettings, syncStorageEffect } from "./utils";

// Don't use / export settingsState directly, always go through the selector
const settingsState = atom<Settings>({
  key: "settingsState",
  default: defaultSettings,
  effects: [syncStorageEffect],
});
export const settingsSelector = selector<Settings>({
  key: "settingsSelector",
  get: ({ get }) => get(settingsState),
  set: ({ get, set }, newSettings) => {
    // NOT CORRECT!!!
    if (newSettings instanceof DefaultValue) {
      return set(settingsState, newSettings);
    }
    if (newSettings.rooms.length) {
      const activeRoomId = get(activeRoomIdSelector);
      const room = newSettings.rooms.find(({ id }) => id === activeRoomId);
      if (!room) {
        set(activeRoomIdSelector, newSettings.rooms[0]!.id);
      }
      return set(settingsState, newSettings);
    }
    const roomId = generatePassword();
    const roomName = getRandomName();
    set(settingsState, {
      ...newSettings,
      rooms: [
        ...newSettings.rooms,
        {
          id: roomId,
          name: getRandomName(),
          password: roomId,
        },
      ],
    });
    const { name } = getRoom(roomId, roomId);
    name.insert(0, roomName);
    set(activeRoomIdSelector, roomId);
    set(activeFileNameState(roomId), "README.md");
    set(isNewUserState, true);
    return;
  },
});
export const yRoomSelector = selector<void>({
  key: "yRoomSelector",
  get: async ({ get }) => {
    const settings = get(settingsSelector);
    const activeRoomId = get(activeRoomIdSelector);
    const room = settings.rooms.find(({ id }) => activeRoomId === id);
    if (!room) return;
    const { initialDbPromise } = getRoom(room.id, room.password);
    await initialDbPromise;
  },
});
