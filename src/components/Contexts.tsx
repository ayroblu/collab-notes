import React from "react";

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
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};
export const SettingsContext = React.createContext<SettingsContext>({} as any);

export const Contexts: React.FC = ({ children }) => {
  const [settings, setSettings] = React.useState(defaultSettings);
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
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
