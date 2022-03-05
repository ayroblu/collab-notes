import React from "react";
import { useRecoilValue } from "recoil";

import { unreachable } from "@/modules/utils";

import { FilesListPane } from "./FilesListPane";
import styles from "./LeftNavPane.module.css";
import { RoomsList } from "./RoomsList";
import {
  leftDrawerVisibleState,
  LeftNavEnum,
  leftNavState,
} from "./data-model";

export const LeftNavPane: React.FC = () => {
  const leftNav = useRecoilValue(leftNavState);
  const leftDrawerVisible = useRecoilValue(leftDrawerVisibleState);
  const part = getLeftNavPanePart(leftNav, leftDrawerVisible);
  return (
    <section className={styles.leftNavPane}>
      {part && <div className={styles.fixedWidth}>{part}</div>}
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
