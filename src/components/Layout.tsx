import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { LeftNav } from "./LeftNav";
import { LeftNavPane } from "./LeftNavPane";
import { ParamsSync, SetupSync, Sync } from "./Sync";

export const Layout: React.FC = () => (
  <SetupSync>
    <Sync />
    <ParamsSync />
    <div className={styles.layout}>
      <LeftNav />
      <div className={styles.grid}>
        <LeftNavPane />
        <div className={styles.flexFill}>
          <Outlet />
        </div>
      </div>
    </div>
  </SetupSync>
);
