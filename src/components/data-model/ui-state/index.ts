import { get, set } from "idb-keyval";
import isEqual from "lodash/isEqual";
import type { IPosition } from "monaco-editor";
import type { AtomEffect } from "recoil";
import { atom, atomFamily, DefaultValue } from "recoil";

import type { LeftNavEnum } from "../types";

const syncCursorStorageEffect: AtomEffect<IPosition> = ({ onSet, setSelf }) => {
  const dbKey = "cursorPosition";
  setSelf(
    get(dbKey).then((savedVal) => (savedVal ? savedVal : new DefaultValue()))
  );
  onSet((newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) return;

    set(dbKey, newVal);
  });
};
export const cursorPositionState = atomFamily<
  IPosition,
  { fileName: string; roomId: string }
>({
  key: "cursorPositionState",
  default: {
    lineNumber: 1,
    column: 1,
  },
  effects: [syncCursorStorageEffect],
});

const syncLeftNavEffect: AtomEffect<LeftNavEnum | null> = ({
  onSet,
  setSelf,
}) => {
  const dbKey = "leftNav";
  setSelf(
    get(dbKey).then((savedVal) => (savedVal ? savedVal : new DefaultValue()))
  );
  onSet((newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) return;

    set(dbKey, newVal);
  });
};
export const leftNavState = atom<LeftNavEnum | null>({
  key: "leftNavState",
  default: null,
  effects: [syncLeftNavEffect],
});
