import React from "react";
import { Link } from "react-router-dom";

import { timeoutPromiseSuccess } from "@/modules/utils";
import { unregister } from "@/serviceWorkerRegistration";

import { LeftNavEnum, SettingsContext } from "./Contexts";

export const LeftNav = () => {
  const { setSettings, settings } = React.useContext(SettingsContext);
  const setSettingsLeftNav = (leftNav: LeftNavEnum) => () => {
    if (settings.leftNav === leftNav) {
      setSettings({ ...settings, leftNav: null });
    } else {
      setSettings({ ...settings, leftNav });
    }
  };
  return (
    <nav>
      <ul>
        <li>
          <button onClick={setSettingsLeftNav(LeftNavEnum.files)}>Files</button>
        </li>
        <li>
          <button onClick={setSettingsLeftNav(LeftNavEnum.rooms)}>Rooms</button>
        </li>
        <li>
          <button onClick={reloadPage}>Refresh</button>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

const reloadPage = async () => {
  await timeoutPromiseSuccess(unregister(), 300);
  location.reload();
};
