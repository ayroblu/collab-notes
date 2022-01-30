import React from "react";

export const useStable = <T extends (...args: any[]) => any>(
  func: T,
  dependents: any[] = []
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => React.useCallback(func, dependents);
