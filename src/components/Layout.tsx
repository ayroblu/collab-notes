import { Outlet } from "react-router-dom";

import { FilesList } from "./FilesList";
import styles from "./Layout.module.css";
import { NavBar } from "./NavBar";
import { RoomsList } from "./RoomsList";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <RoomsList />
      <FilesList />
      <div className={styles.flexGrow}>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};
