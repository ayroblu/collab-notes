import React from "react";
import { get, set } from "idb-keyval";
import { getRoom } from "../modules/documents";
import { Loading } from "./Loading";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const paramRoomId = searchParams.get("roomId");
  const paramRoomPassword = searchParams.get("roomPassword");
  const paramFileName = searchParams.get("fileName");
  const navigate = useNavigate();
  const func = React.useCallback(async () => {
    const savedSettings: Settings | undefined = await get(dbKey);
    if (!savedSettings) {
      if (paramRoomId && paramRoomPassword && paramFileName) {
        console.log(paramRoomId, paramRoomPassword, paramFileName);
        setSettings({
          ...settings,
          rooms: [
            {
              id: paramRoomId,
              password: paramRoomPassword,
            },
          ],
          activeRoomId: paramRoomId,
        });
        navigate(`files?name=${encodeURIComponent(paramFileName)}`);
      }
      return;
    }
    if (paramRoomId && paramRoomPassword && paramFileName) {
      console.log(paramRoomId, paramRoomPassword, paramFileName);
      savedSettings.rooms.push({
        id: paramRoomId,
        password: paramRoomPassword,
      });
      savedSettings.activeRoomId = paramRoomId;
      navigate(`files?name=${encodeURIComponent(paramFileName)}`);
    }
    setSettings(savedSettings);
    const room = savedSettings.rooms.find(
      ({ id }) => id === savedSettings.activeRoomId
    );
    if (!room) return;
    console.log(
      `?roomId=${encodeURIComponent(room.id)}&roomPassword=${encodeURIComponent(
        room.password
      )}&fileName=README.md`
    );
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
