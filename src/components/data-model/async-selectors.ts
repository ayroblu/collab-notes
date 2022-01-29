import { get } from "idb-keyval";
import React from "react";
import { selector } from "recoil";

import { uuidv4 } from "@/modules/utils";

import type { Settings } from ".";
import { lastUpdatedState } from ".";

export const savedSettingsSelector = selector({
  key: "savedSettingsSelector",
  get: async ({ get }) => {
    // Need this just so we it updates when we broadcast updates
    get(lastUpdatedState);
    return idbGetWithMigrations();
  },
});

const dbKey = "settings";
async function idbGetWithMigrations(): Promise<Settings | void> {
  const settings: Settings | void = await get(dbKey);
  if (!settings) return;
  // Mutate with migrations
  if (!settings.id) {
    settings.id = uuidv4();
  }

  return settings;
}

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
}
enum SettingsMessagesEnum {
  update = "update",
}
type SettingsBroadcast = {
  message: SettingsMessagesEnum;
};

function useBroadcastSync(setSettings: (settings: Settings) => void) {
  React.useEffect(() => {
    listenToUpdates(async ({ message }) => {
      if (message === SettingsMessagesEnum.update) {
        const savedSettings: Settings | void = await idbGetWithMigrations();
        // Theoretically there are a few edge cases that aren't desireable. May
        // want to handle this in the future
        savedSettings && setSettings(savedSettings);
      }
    });
  }, []);
}
