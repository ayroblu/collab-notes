import React from "react";
import {
  VscFiles,
  VscOrganization,
  VscRefresh,
  VscSettingsGear,
} from "react-icons/vsc";
import { Link } from "react-router-dom";

import { timeoutPromiseSuccess } from "@/modules/utils";
import { unregister } from "@/serviceWorkerRegistration";

import { LeftNavEnum, SettingsContext } from "./Contexts";
import styles from "./LeftNav.module.css";

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
            <NavButton onClick={setSettingsLeftNav(LeftNavEnum.files)}>
              <VscFiles />
              Files
            </NavButton>
          </li>
          <li>
            <NavButton onClick={setSettingsLeftNav(LeftNavEnum.rooms)}>
              <VscOrganization />
              Groups
            </NavButton>
          </li>
        </ul>
      </section>
      <section>
        <ul>
          <li>
            <NavButton onClick={reloadPage}>
              <VscRefresh />
              Refresh
            </NavButton>
          </li>
          <li>
            <Link to="/settings" className={styles.leftNavButton}>
              <VscSettingsGear />
              Settings
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

const NavButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return <button className={styles.leftNavButton} {...props} />;
};

const reloadPage = async () => {
  await timeoutPromiseSuccess(unregister(), 300);
  location.reload();
};
