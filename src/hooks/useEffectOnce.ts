import React from "react";

export const useEffectOnce = (func: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(func, []);
};
