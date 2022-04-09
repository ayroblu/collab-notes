import { get, set } from "idb-keyval";
import isEqual from "lodash/isEqual";
import type { AtomEffect } from "recoil";
import { DefaultValue } from "recoil";

import { uuidv4 } from "@/modules/utils";

import type { Settings } from "..";

const dbKey = "settings";

export const syncStorageEffect: AtomEffect<Settings> = ({ onSet, setSelf }) => {
  setSelf(
    idbGetWithMigrations().then((savedSettings) =>
      // Active room id should be set by the app elsewhere, so this should be okay
      savedSettings ? savedSettings : new DefaultValue(),
    ),
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
      const { data } = ev;
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
  if (!settings.websockets) {
    settings.websockets = [{ url: "wss://demos.yjs.dev", isEnabled: false }];
  }

  return settings;
}
