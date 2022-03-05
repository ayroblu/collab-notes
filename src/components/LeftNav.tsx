import React from "react";
import {
  VscFiles,
  VscOrganization,
  VscRefresh,
  VscSettingsGear,
} from "react-icons/vsc";
import { useRecoilState, useSetRecoilState } from "recoil";

import { nonNullable, timeoutPromiseSuccess } from "@/modules/utils";
import { unregister } from "@/serviceWorkerRegistration";

import styles from "./LeftNav.module.css";
import { LeftNavButton, LeftNavButtonLink } from "./LeftNavButton";
import {
  leftDrawerVisibleState,
  LeftNavEnum,
  leftNavState,
} from "./data-model";

export const LeftNav = () => {
  const [leftNav, setLeftNav] = useRecoilState(leftNavState);
  const setLeftDrawerVisible = useSetRecoilState(leftDrawerVisibleState);
  const setNewLeftNav = (newLeftNav: LeftNavEnum) => () => {
    if (leftNav === newLeftNav) {
      setLeftDrawerVisible((isVisible) => !isVisible);
    } else {
      setLeftNav(newLeftNav);
      setLeftDrawerVisible(true);
    }
  };
  return (
    <nav className={styles.leftNav}>
      <section>
        <ul>
          <li>
            <LeftNavButton
              isHighlight={leftNav === LeftNavEnum.files}
              onClick={setNewLeftNav(LeftNavEnum.files)}
            >
              <VscFiles />
              Files
            </LeftNavButton>
          </li>
          <li>
            <LeftNavButton
              isHighlight={leftNav === LeftNavEnum.rooms}
              onClick={setNewLeftNav(LeftNavEnum.rooms)}
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
              Reset
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
  const dbs = await window.indexedDB.databases();
  dbs
    .map((db) => db.name)
    .filter(nonNullable)
    .forEach((name) => {
      window.indexedDB.deleteDatabase(name);
    });
  location.reload();
};
