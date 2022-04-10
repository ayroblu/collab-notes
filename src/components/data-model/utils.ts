import { get, set } from "idb-keyval";
import isEqual from "lodash/isEqual";
import type { AtomEffect } from "recoil";
import { DefaultValue } from "recoil";

import { nonNullable } from "@/modules/utils";

export const syncIdbEffect =
  <T>(dbKey: string): AtomEffect<T> =>
  ({ onSet, setSelf }) => {
    setSelf(
      get(dbKey).then((savedVal: T | null) =>
        nonNullable(savedVal) ? savedVal : new DefaultValue(),
      ),
    );
    onSet((newVal, oldVal) => {
      if (isEqual(newVal, oldVal)) return;

      set(dbKey, newVal);
    });
  };
