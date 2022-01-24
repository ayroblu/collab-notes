import { get, set } from "idb-keyval";
import type * as monaco from "monaco-editor";
import React from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { generatePassword, getRandomName } from "@/modules/utils";

import type { CommentData } from "../modules/documents";
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
};
export const EditorContext = React.createContext<EditorContext>({} as any);
type CommentsContext = {
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  commentRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
};
export const CommentsContext = React.createContext<CommentsContext>({} as any);

const dbKey = "settings";
export const Contexts: React.FC = ({ children }) => {
  const [settings, setSettingsState] = React.useState(defaultSettings);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [comments, setComments] = React.useState<CommentData[]>([]);
  const commentRefs = React.useRef<{ [key: string]: HTMLElement }>({});

  const setSettings = React.useCallback((settings: Settings) => {
    setSettingsState(settings);
    set(dbKey, settings);
  }, []);
  const func = useSetupFunc(settings, setSettings);

  return (
    <Loading
      func={func}
      error={<p>Failed to fetch data locally, are you on incognito?</p>}
      loading={<p>Loading...</p>}
    >
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <EditorContext.Provider value={{ editorRef }}>
          <CommentsContext.Provider
            value={{ comments, setComments, commentRefs }}
          >
            {children}
          </CommentsContext.Provider>
        </EditorContext.Provider>
      </SettingsContext.Provider>
    </Loading>
  );
};

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
          activeRoomId: paramRoomId,
        });
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
  id: string;
};
export enum LeftNavEnum {
  files = "files",
  rooms = "rooms",
}
