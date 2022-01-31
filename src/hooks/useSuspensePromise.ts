import isEqual from "lodash/isEqual";
import React from "react";

import { useIsMounted } from "./useIsMounted";

enum FetchStatusEnum {
  none = "none",
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

const initialLoadRef: any = {};
export const useSuspensePromise = <T>(
  key: string,
  func: () => Promise<T>,
  dependents: any[]
): T => {
  if (!initialLoadRef[key]) {
    initialLoadRef[key] = {
      fetchStatus: FetchStatusEnum.none,
      result: Error("func not run in suspense promise"),
      deps: null,
    };
  }
  const runFunc = () => {
    if (isEqual(initialLoadRef[key].deps, dependents)) return;

    initialLoadRef[key].deps = dependents;
    initialLoadRef[key].fetchStatus = FetchStatusEnum.loading;
    initialLoadRef[key].result = func()
      .then((v) => {
        initialLoadRef[key].fetchStatus = FetchStatusEnum.loaded;
        initialLoadRef[key].result = v;
      })
      .catch((e) => {
        initialLoadRef[key].fetchStatus = FetchStatusEnum.error;
        initialLoadRef[key].result = e;
      });
  };
  runFunc();

  switch (initialLoadRef[key].fetchStatus) {
    case FetchStatusEnum.loaded:
      return initialLoadRef[key].result;
    case FetchStatusEnum.none:
    case FetchStatusEnum.loading:
    case FetchStatusEnum.error:
    default:
      throw initialLoadRef[key].result;
  }
};
