import { atom, DefaultValue, selector } from "recoil";

import { generatePassword, getRandomName, uuidv4 } from "@/modules/utils";

import type { Settings } from "..";
import { activeFileNameState, activeRoomIdSelector, isNewUserState } from "..";

import { syncStorageEffect } from "./utils";

// Don't use / export settingsState directly, always go through the selector
const settingsState = atom<Settings>({
  key: "settingsState",
  default: selector<Settings>({
    key: "defaultSettingsSelector",
    get: () => getDefaultSettings(),
  }),
  effects: [syncStorageEffect],
});
export const settingsSelector = selector<Settings>({
  key: "settingsSelector",
  get: ({ get }) => get(settingsState),
  set: ({ get, set }, newSettings) => {
    if (newSettings instanceof DefaultValue) {
      set(settingsState, newSettings);
      const settings = get(settingsState);
      set(activeRoomIdSelector, settings.rooms[0]!.id);
      return;
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
    set(settingsState, {
      ...newSettings,
      rooms: [
        ...newSettings.rooms,
        {
          id: roomId,
          password: roomId,
        },
      ],
    });
    set(activeRoomIdSelector, roomId);
    set(activeFileNameState(roomId), "README.md");
    set(isNewUserState, true);
    
  },
});

function getDefaultSettings() {
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const roomId = generatePassword();
  return {
    isVim: false,
    vimrc: "imap jk <Esc>\nimap jj <Esc>",
    wordWrap: true,
    name: getRandomName(),
    theme: isDark ? "vs-dark" : "vs",
    rooms: [
      {
        id: roomId,
        password: roomId,
      },
    ],
    leftNav: null,
    id: uuidv4(),
  };
}
