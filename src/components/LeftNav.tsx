import React from "react";
import {
  VscFiles,
  VscOrganization,
  VscRefresh,
  VscSettingsGear,
} from "react-icons/vsc";

import { timeoutPromiseSuccess } from "@/modules/utils";
import { unregister } from "@/serviceWorkerRegistration";

import { LeftNavEnum, SettingsContext } from "./Contexts";
import styles from "./LeftNav.module.css";
import { LeftNavButton, LeftNavButtonLink } from "./LeftNavButton";

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
    <nav className={styles.leftNav}>
      <section>
        <ul>
          <li>
            <LeftNavButton
              isHighlight={settings.leftNav === LeftNavEnum.files}
              onClick={setSettingsLeftNav(LeftNavEnum.files)}
            >
              <VscFiles />
              Files
            </LeftNavButton>
          </li>
          <li>
            <LeftNavButton
              isHighlight={settings.leftNav === LeftNavEnum.rooms}
              onClick={setSettingsLeftNav(LeftNavEnum.rooms)}
            >
              <VscOrganization />
              Groups
            </LeftNavButton>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <LeftNavButton onClick={reloadPage}>
              <VscRefresh />
              Refresh
            </LeftNavButton>
          </li>
          <li>
            <LeftNavButtonLink to="/settings">
              <VscSettingsGear />
              Settings
            </LeftNavButtonLink>
          </li>
        </ul>
      </section>
    </nav>
  );
};

const reloadPage = async () => {
  await timeoutPromiseSuccess(unregister(), 300);
  location.reload();
};
