import React, { Suspense } from "react";
import { useRecoilSnapshot } from "recoil";

import { Spinner } from "./shared/Spinner";

export const TempSuspense: React.FC = ({ children }) => {
  const [isSuspense, setIsSuspense] = React.useState(true);
  setTimeout(() => setIsSuspense(false), 2000);
  if (!isSuspense) {
    return <>{children}</>;
  }
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export function DebugObserver(): React.ReactElement | null {
  const snapshot = useRecoilSnapshot();
  React.useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}
