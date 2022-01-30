import React from "react";

export const useLayoutEffectOnce = (func: () => void) => {
  React.useLayoutEffect(func);
};
