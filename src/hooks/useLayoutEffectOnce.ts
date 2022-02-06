import React from "react";

export const useLayoutEffectOnce = (func: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(func, []);
};
