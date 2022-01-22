import { get, set } from "idb-keyval";
import React from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { generatePassword, getRandomName } from "@/modules/utils";

import { getRoom } from "../modules/documents";

import { Loading } from "./Loading";

const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const defaultSettings: Settings = {
  isVim: false,
  vimrc: "imap jk <Esc>\nimap jj <Esc>",
  wordWrap: true,
  name: getRandomName(),
  theme: isDark ? "vs-dark" : "vs",
  rooms: [],
  activeRoomId: null,
  leftNav: null,
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
  const paramRoomId = searchParams.get("id");
  const paramRoomName = searchParams.get("groupName");
  const paramRoomPassword = searchParams.get("password");
  const paramFileName = searchParams.get("name");
  const navigate = useNavigate();
  const setSettings = React.useCallback((settings: Settings) => {
    setSettingsState(settings);
    set(dbKey, settings);
  }, []);

  const func = React.useCallback(async () => {
    // if route params -> add room to rooms list and switch
    // If new user -> create new room + readme.md
    const savedSettings: Settings | undefined = await get(dbKey);
    if (paramRoomId && paramFileName) {
      const rooms = savedSettings?.rooms || settings.rooms;
      if (!rooms.find(({ id }) => id === paramRoomId)) {
        setSettings({
          ...(savedSettings || settings),
          rooms: [
            ...rooms,
            {
              id: paramRoomId,
              name: paramRoomName || "",
              password: paramRoomPassword || paramRoomId,
            },
          ],
          activeRoomId: paramRoomId,
        });
        // navigate({
        //   pathname: "/files",
        //   search: `?${createSearchParams({
        //     name: paramFileName,
        //     id: paramRoomId,
        //   })}`,
        // });
        // navigate should be unnecessary due to the params already being there
        return;
      }
    }
    if (!savedSettings || !savedSettings.rooms.length) {
      const roomId = generatePassword();
      const roomName = getRandomName();
      setSettings({
        ...settings,
        rooms: [
          ...settings.rooms,
          {
            id: roomId,
            name: getRandomName(),
            password: roomId,
          },
        ],
        activeRoomId: roomId,
      });
      const { name } = getRoom(roomId, roomId);
      name.insert(0, roomName);
      navigate({
        pathname: "/files",
        search: `?${createSearchParams({
          name: "README.md",
          id: roomId,
          newUser: "1",
        })}`,
      });
      return;
    }
    setSettings(savedSettings);
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
  wordWrap: boolean;
  name: string;
  theme: string;
  activeRoomId: string | null;
  rooms: Room[];
  leftNav: LeftNavEnum | null;
};
export enum LeftNavEnum {
  files = "files",
  rooms = "rooms",
}
