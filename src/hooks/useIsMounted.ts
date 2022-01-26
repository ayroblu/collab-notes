import React from "react";

export const useIsMounted = () => {
  const ref = React.useRef(true);
  React.useEffect(
    () => () => {
      ref.current = false;
    },
    []
  );
  return () => ref.current;
};
