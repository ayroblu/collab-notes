import qs from "query-string";
import React from "react";
import { VscLiveShare } from "react-icons/vsc";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import type { Room } from "./Contexts";
import { SettingsContext } from "./Contexts";
import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  const location = useLocation();
  const pathname = location.pathname;
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  const shouldShowShare = room && fileName && pathname === filesRoute;
  return (
    <header className={styles.nav}>
      <h1 className={styles.pageTitle}>
        <Link to="/">Collab Notes</Link>
      </h1>
      {shouldShowShare && <RoomShareButton room={room} fileName={fileName} />}
    </header>
  );
};
const filesRoute = "/files";
type RoomShareButtonProps = {
  room: Room;
  fileName: string;
};
const RoomShareButton: React.FC<RoomShareButtonProps> = ({
  fileName,
  room,
}) => {
  const params = {
    roomId: room.id,
    roomName: room.name,
    roomPassword: room.password,
    fileName,
  };
  const link = `${window.location.origin}${filesRoute}?${qs.stringify(params)}`;
  const shareHandler = () => {
    copyToClipboard(link);
  };
  return (
    <button onClick={shareHandler} className={styles.shareButton}>
      Share
      <VscLiveShare />
    </button>
  );
};

function copyToClipboard(text: string) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
