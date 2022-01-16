import React from "react";

import { unreachable } from "@/modules/utils";

import { LeftNavEnum, SettingsContext } from "./Contexts";
import { FilesList } from "./FilesList";
import { RoomsList } from "./RoomsList";

export const LeftNavPane: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  return <section>{getLeftNavPanePart(settings.leftNav)}</section>;
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

const LeftNavFiles: React.FC = () => {
  return <FilesList />;
};
const LeftNavRooms: React.FC = () => {
  return <RoomsList />;
};
