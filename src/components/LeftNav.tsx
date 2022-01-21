import React from "react";
import {
  VscFiles,
  VscOrganization,
  VscRefresh,
  VscSettingsGear,
} from "react-icons/vsc";
import { Link } from "react-router-dom";

import { cn, timeoutPromiseSuccess } from "@/modules/utils";
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
            <NavButton
              isHighlight={settings.leftNav === LeftNavEnum.files}
              onClick={setSettingsLeftNav(LeftNavEnum.files)}
            >
              <VscFiles />
              Files
            </NavButton>
          </li>
          <li>
            <NavButton
              isHighlight={settings.leftNav === LeftNavEnum.rooms}
              onClick={setSettingsLeftNav(LeftNavEnum.rooms)}
            >
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
  > & { isHighlight?: boolean }
> = ({ isHighlight, ...props }) => {
  return (
    <button
      className={cn(styles.leftNavButton, isHighlight && styles.highlight)}
      {...props}
    />
  );
};

const reloadPage = async () => {
  await timeoutPromiseSuccess(unregister(), 300);
  location.reload();
};
