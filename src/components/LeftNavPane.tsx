import React from "react";

import { unreachable } from "@/modules/utils";

import { LeftNavEnum, SettingsContext } from "./Contexts";
import { FilesListPane } from "./FilesListPane";
import styles from "./LeftNavPane.module.css";
import { RoomsList } from "./RoomsList";

export const LeftNavPane: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  const part = getLeftNavPanePart(settings.leftNav);
  return (
    <section className={styles.leftNavPane}>
      {part && <div className={styles.fixedWidth}>{part}</div>}
    </section>
  );
};

function getLeftNavPanePart(type: LeftNavEnum | null) {
  if (!type) {
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
