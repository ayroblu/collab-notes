import React from "react";
import { SettingsContext } from "./Contexts";

export const Home: React.FC = () => {
  const { settings, setSettings } = React.useContext(SettingsContext);
  return (
    <section>
      <h1>Welcome to Collab Notes</h1>
      <p>
        This is decentralised way of keeping notes, none of your notes data is
        stored on our servers (this doesn't have any servers)
      </p>
      <p>
        Enter your nickname:{" "}
        <input
          value={settings.name}
          onChange={(e) => setSettings({ ...settings, name: e.target.value })}
        />
      </p>
      <p>Enter your room id:</p>
      <p>create a new room</p>
      <p>Editor settings</p>
    </section>
  );
};
