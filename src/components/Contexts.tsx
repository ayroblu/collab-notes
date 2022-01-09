import React from "react";

const defaultSettings: Settings = {
  isVim: true,
  vimrc: "",
  name: "",
  theme: "Monokai",
  rooms: [],
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

type Settings = {
  isVim: boolean;
  vimrc: string;
  name: string;
  theme: string;
  rooms: {
    id: string;
    password: string;
    name: string;
    files: {
      name: string;
    }[];
  }[];
};
