import React from "react";

export const useStable = <T extends Function>(func: T): T => {
  const ref = React.useRef(func);
  ref.current = func;

  return React.useCallback(
    (...args) => ref.current(...args),
    [],
    // TypeScript not quite handling the generic Function very well
  ) as unknown as T;
};
