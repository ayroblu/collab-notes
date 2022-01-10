import React from "react";
import { useIsMounted } from "../hooks/useIsMounted";

type LoadingProps = {
  func: () => Promise<void>;
  loading: React.ReactElement | null;
  error: React.ReactElement | null;
};
export const Loading: React.FC<LoadingProps> = ({
  func,
  children,
  error,
  loading,
}) => {
  const [loadingState, setLoadingState] = React.useState<LoadingState>(
    LoadingState.none
  );
  const getIsMounted = useIsMounted();
  React.useEffect(() => {
    func()
      .then(() => getIsMounted() && setLoadingState(LoadingState.loaded))
      .catch(() => getIsMounted() && setLoadingState(LoadingState.failed));
    setLoadingState(LoadingState.loading);
  }, []);
  switch (loadingState) {
    case LoadingState.none:
    case LoadingState.loading:
      return loading;
    case LoadingState.loaded:
      return <>{children}</>;
    case LoadingState.failed:
    default:
      return error;
  }
};
enum LoadingState {
  none = "none",
  loading = "loading",
  loaded = "loaded",
  failed = "failed",
}
