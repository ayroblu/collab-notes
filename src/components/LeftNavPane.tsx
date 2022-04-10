import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { getIsSmallScreen, unreachable } from "@/modules/utils";

import { FilesListPane } from "./FilesListPane";
import styles from "./LeftNavPane.module.css";
import { RoomsList } from "./RoomsList";
import {
  leftDrawerVisibleState,
  LeftNavEnum,
  leftNavState,
} from "./data-model";
import { Drawer } from "./shared/Drawer";

export const LeftNavPane: React.FC = () => {
  const leftNav = useRecoilValue(leftNavState);
  const [leftDrawerVisible, setLeftDrawerVisible] = useRecoilState(
    leftDrawerVisibleState,
  );
  const part = getLeftNavPanePart(leftNav, leftDrawerVisible);
  useKeyboardShortcut();
  const isSmallScreen = getIsSmallScreen();
  return (
    <section className={styles.leftNavPane}>
      {part &&
        (isSmallScreen ? (
          <Drawer
            isVisible={leftDrawerVisible}
            position="start"
            setIsVisible={() => setLeftDrawerVisible(false)}
          >
            {part}
          </Drawer>
        ) : (
          <div className={styles.fixedWidth}>{part}</div>
        ))}
    </section>
  );
};

function getLeftNavPanePart(type: LeftNavEnum, isVisible: boolean) {
  if (!isVisible) {
    return null;
  }
  switch (type) {
    case LeftNavEnum.files:
      return <LeftNavFiles />;
    case LeftNavEnum.rooms:
      return <LeftNavRooms />;
    default:
      unreachable(type);
      return null;
  }
}

const LeftNavFiles: React.FC = () => <FilesListPane />;
const LeftNavRooms: React.FC = () => <RoomsList />;

const useKeyboardShortcut = () => {
  const setLeftDrawerVisible = useSetRecoilState(leftDrawerVisibleState);
  React.useEffect(() => {
    const func = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        setLeftDrawerVisible((isVisible) => !isVisible);
      }
    };
    document.addEventListener("keydown", func);
    return () => {
      document.removeEventListener("keydown", func);
    };
  }, [setLeftDrawerVisible]);
};
