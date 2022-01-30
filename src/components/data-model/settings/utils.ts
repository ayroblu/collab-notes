import { get, set } from "idb-keyval";
import isEqual from "lodash/isEqual";
import type { AtomEffect } from "recoil";
import { DefaultValue } from "recoil";

import { getRandomName, uuidv4 } from "@/modules/utils";

import type { Settings } from "..";

const dbKey = "settings";

const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
export const defaultSettings: Settings = {
  isVim: false,
  vimrc: "imap jk <Esc>\nimap jj <Esc>",
  wordWrap: true,
  name: getRandomName(),
  theme: isDark ? "vs-dark" : "vs",
  rooms: [],
  leftNav: null,
  id: uuidv4(),
};

export const syncStorageEffect: AtomEffect<Settings> = ({ onSet, setSelf }) => {
  // 1. indexeddb
  // 2. effect -> no rooms -> new room
  // 3. onSet -> broadcast new room -> then do nothing
  setSelf(
    // TODO: ALSO VERY WRONG, not DefaultValue
    idbGetWithMigrations().then((savedSettings) =>
      savedSettings ? savedSettings : new DefaultValue()
    )
  );
  onSet((newSettings, oldSettings) => {
    if (isEqual(newSettings, oldSettings)) return;

    set(dbKey, newSettings);
    broadcastUpdate();
  });

  const dispose = listenToUpdates(async ({ message }) => {
    if (message === SettingsMessagesEnum.update) {
      const savedSettings: Settings | void = await idbGetWithMigrations();
      // Theoretically there are a few edge cases that aren't desireable. May
      // want to handle this in the future
      savedSettings && setSelf(savedSettings);
    }
  });
  return () => {
    dispose();
  };
};

const bc = "BroadcastChannel" in self ? new BroadcastChannel(dbKey) : null;
function broadcastUpdate() {
  if (bc) {
    const message: SettingsBroadcast = {
      message: SettingsMessagesEnum.update,
    };
    bc.postMessage(message);
  }
}
function listenToUpdates(func: (message: SettingsBroadcast) => void) {
  if (bc) {
    bc.onmessage = (ev) => {
      const data: SettingsBroadcast = ev.data;
      func(data);
    };
  }
  return () => {
    if (bc) {
      bc.onmessage = null;
    }
  };
}
enum SettingsMessagesEnum {
  update = "update",
}
type SettingsBroadcast = {
  message: SettingsMessagesEnum;
};

export async function idbGetWithMigrations(): Promise<Settings | void> {
  const settings: Settings | void = await get(dbKey);
  if (!settings) return;
  // Mutate with migrations
  if (!settings.id) {
    settings.id = uuidv4();
  }

  return settings;
}
