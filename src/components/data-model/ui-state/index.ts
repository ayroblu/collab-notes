import type { IPosition } from "monaco-editor";
import { atom, atomFamily } from "recoil";

import { LeftNavEnum } from "../types";
import { syncIdbEffect } from "../utils";

export const cursorPositionState = atomFamily<
  IPosition,
  { fileName: string; roomId: string }
>({
  key: "cursorPositionState",
  default: {
    lineNumber: 1,
    column: 1,
  },
  effects: [syncIdbEffect("cursorPosition")],
});

export const leftNavState = atom<LeftNavEnum>({
  key: "leftNavState",
  default: LeftNavEnum.files,
  effects: [syncIdbEffect("leftNav")],
});

export const leftDrawerVisibleState = atom<boolean>({
  key: "leftDrawerVisibleState",
  default: false,
  effects: [syncIdbEffect("leftDrawerVisible")],
});
