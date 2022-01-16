import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { LeftNav } from "./LeftNav";
import { LeftNavPane } from "./LeftNavPane";
import { NavBar } from "./NavBar";

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <LeftNav />
      <div className={styles.grid}>
        <LeftNavPane />
        <div className={styles.flexFill}>
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
