import { get, set } from "idb-keyval";
import type * as monaco from "monaco-editor";
import React from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { getRandomName } from "@/modules/utils";

import { getRoom } from "../modules/documents";

import { activeRoomIdState } from "./data-model";
import type { Room } from "./data-model/types";
import { Loading } from "./shared/Loading";

const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const defaultSettings: Settings = {
  isVim: false,
  vimrc: "imap jk <Esc>\nimap jj <Esc>",
  wordWrap: true,
  name: getRandomName(),
  theme: isDark ? "vs-dark" : "vs",
  rooms: [],
  leftNav: null,
  id: uuidv4(),
};
type SettingsContext = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};
export const SettingsContext = React.createContext<SettingsContext>({} as any);
type EditorContext = {
  editorRef: React.MutableRefObject<
    monaco.editor.IStandaloneCodeEditor | undefined
  >;
  editorDivRef: React.RefObject<HTMLDivElement>;
};
export const EditorContext = React.createContext<EditorContext>({} as any);
type CommentsContext = {
  commentRefs: React.MutableRefObject<{ [key: string]: CommentLayout }>;
};
type CommentLayout = {
  el: HTMLElement;
  height: number;
  top: number;
};
export const CommentsContext = React.createContext<CommentsContext>({} as any);

const dbKey = "settings";
export const Contexts: React.FC = ({ children }) => {
  const [settings, setSettingsState] = React.useState(defaultSettings);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const editorDivRef = React.useRef<HTMLDivElement>(null);
  const commentRefs = React.useRef<{ [key: string]: CommentLayout }>({});

  const setSettings = React.useCallback(async (settings: Settings) => {
    setSettingsState(settings);
    await set(dbKey, settings);
    broadcastUpdate();
  }, []);
  const setSettingsLocal = React.useCallback((settings: Settings) => {
    setSettingsState(settings);
    set(dbKey, settings);
  }, []);
  const func = useSetupFunc(settings, setSettingsLocal);
  useBroadcastSync(setSettingsLocal);

  return (
    <Loading
      func={func}
      error={<p>Failed to fetch data locally, are you on incognito?</p>}
      loading={<p>Loading...</p>}
    >
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <EditorContext.Provider value={{ editorRef, editorDivRef }}>
          <CommentsContext.Provider value={{ commentRefs }}>
            {children}
          </CommentsContext.Provider>
        </EditorContext.Provider>
      </SettingsContext.Provider>
    </Loading>
  );
};

function useBroadcastSync(setSettings: (settings: Settings) => void) {
  React.useEffect(() => {
    listenToUpdates(async ({ message }) => {
      if (message === SettingsMessagesEnum.update) {
        const savedSettings: Settings | void = await idbGetWithMigrations();
        // Theoretically there are a few edge cases that aren't desireable. May
        // want to handle this in the future
        savedSettings && setSettings(savedSettings);
      }
    });
  }, []);
}

function useSetupFunc(
  settings: Settings,
  setSettings: (settings: Settings) => void
) {
  const [searchParams] = useSearchParams();
  const paramRoomId = searchParams.get("id");
  const paramRoomName = searchParams.get("groupName");
  const paramRoomPassword = searchParams.get("password");
  const paramFileName = searchParams.get("name");
  const navigate = useNavigate();
  const [activeRoomId, setActiveRoomId] = useRecoilState(activeRoomIdState);
  const func = React.useCallback(async () => {
    // if route params -> add room to rooms list and switch
    // If new user -> create new room + readme.md
    const savedSettings: Settings | void = await idbGetWithMigrations();
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
        });
        setActiveRoomId(paramRoomId);
        return;
      }
    }
    if (!savedSettings || !savedSettings.rooms.length) {
      const roomId = activeRoomId;
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
    const room = savedSettings.rooms[0];
    if (!room) return;
    const { initialDbPromise } = getRoom(room.id, room.password);
    await initialDbPromise;
  }, []);
  return func;
}

async function idbGetWithMigrations(): Promise<Settings | void> {
  const settings: Settings | void = await get(dbKey);
  if (!settings) return;
  // Mutate with migrations
  if (!settings.id) {
    settings.id = uuidv4();
  }

  return settings;
}

export type Settings = {
  isVim: boolean;
  vimrc: string;
  wordWrap: boolean;
  name: string;
  theme: string;
  rooms: Room[];
  leftNav: LeftNavEnum | null;
  id: string;
};
export enum LeftNavEnum {
  files = "files",
  rooms = "rooms",
}

const bc = "BroadcastChannel" in self ? new BroadcastChannel(dbKey) : null;
function broadcastUpdate() {
  if (bc) {
    const message: SettingsBroadcast = {
      message: SettingsMessagesEnum.update,
    };
    bc.postMessage(message);
  }
}
function listenToUpdates(func: (message: SettingsBroadcast) => void) {
  if (bc) {
    bc.onmessage = (ev) => {
      const data: SettingsBroadcast = ev.data;
      func(data);
    };
  }
}
enum SettingsMessagesEnum {
  update = "update",
}
type SettingsBroadcast = {
  message: SettingsMessagesEnum;
};
