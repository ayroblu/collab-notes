import { get, set } from "idb-keyval";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getRoom } from "../modules/documents";

import { Loading } from "./Loading";


const defaultSettings: Settings = {
  isVim: true,
  vimrc: "imap jk <Esc>",
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
  const paramRoomName = searchParams.get("roomName");
  const paramRoomPassword = searchParams.get("roomPassword");
  const paramFileName = searchParams.get("fileName");
  const navigate = useNavigate();
  const setSettings = React.useCallback((settings: Settings) => {
    setSettingsState(settings);
    set(dbKey, settings);
  }, []);
  const func = React.useCallback(async () => {
    const savedSettings: Settings | undefined = await get(dbKey);
    if (!savedSettings) {
      if (paramRoomId && paramRoomName && paramRoomPassword && paramFileName) {
        const name =
          prompt("Enter your nickname") ||
          `User${(Math.random() * 1000).toFixed()}`;
        setSettings({
          ...settings,
          name,
          rooms: [
            {
              id: paramRoomId,
              name: paramRoomName,
              password: paramRoomPassword,
            },
          ],
          activeRoomId: paramRoomId,
        });
        navigate(`files?name=${encodeURIComponent(paramFileName)}`);
      }
      return;
    }
    if (paramRoomId && paramRoomName && paramRoomPassword && paramFileName) {
      const savedSettingsWithParam = {
        ...savedSettings,
        rooms: savedSettings.rooms
          .filter(({ id }) => id !== paramRoomId)
          .concat({
            id: paramRoomId,
            name: paramRoomName,
            password: paramRoomPassword,
          }),
        activeRoomId: paramRoomId,
      };
      setSettings(savedSettingsWithParam);
      // this navigation is fine to do now as everything after this still needs to wait for it to finish
      navigate(`files?name=${encodeURIComponent(paramFileName)}`);
    } else {
      setSettings(savedSettings);
    }
    const room = savedSettings.rooms.find(
      ({ id }) => id === savedSettings.activeRoomId
    );
    if (!room) return;
    const { initialDbPromise } = getRoom(room.id, room.password);
    await initialDbPromise;
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

export type Room = {
  id: string;
  name: string;
  password: string;
};
export type Settings = {
  isVim: boolean;
  vimrc: string;
  name: string;
  theme: string;
  activeRoomId: string | null;
  rooms: Room[];
};
