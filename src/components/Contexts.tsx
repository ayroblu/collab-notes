import React from "react";
import { get, set } from "idb-keyval";
import { getRoom } from "../modules/documents";
import { useIsMounted } from "../hooks/useIsMounted";

const defaultSettings: Settings = {
  isVim: true,
  vimrc: "",
  name: "",
  theme: "Monokai",
  rooms: [],
  activeRoomId: null,
};
type SettingsContext = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};
export const SettingsContext = React.createContext<SettingsContext>({} as any);

const dbKey = "settings";
export const Contexts: React.FC = ({ children }) => {
  const [settings, setSettingsState] = React.useState(defaultSettings);
  const func = React.useCallback(async () => {
    const savedSettings: Settings | undefined = await get(dbKey);
    if (!savedSettings) return;
    setSettings(savedSettings);
    const room = savedSettings.rooms.find(
      ({ id }) => id === savedSettings.activeRoomId
    );
    if (!room) return;
    const { initialDbPromise } = getRoom(room.id, room.password);
    await initialDbPromise;
  }, []);
  const setSettings = React.useCallback((settings: Settings) => {
    setSettingsState(settings);
    set(dbKey, settings);
  }, []);
  return (
    <Loading
      func={func}
      error={<p>Faied to fetch data locally, are you on incognito?</p>}
      loading={<p>Loading...</p>}
    >
      <SettingsContext.Provider value={{ settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
    </Loading>
  );
};

type LoadingProps = {
  func: () => Promise<void>;
  loading: React.ReactElement | null;
  error: React.ReactElement | null;
};
const Loading: React.FC<LoadingProps> = ({
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

export type Settings = {
  isVim: boolean;
  vimrc: string;
  name: string;
  theme: string;
  activeRoomId: string | null;
  rooms: {
    id: string;
    password: string;
  }[];
};
