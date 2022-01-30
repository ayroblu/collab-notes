import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { LeftNav } from "./LeftNav";
import { LeftNavPane } from "./LeftNavPane";
import { ParamsSync } from "./Sync";

export const Layout: React.FC = () => (
  <div className={styles.layout}>
    <ParamsSync />
    <LeftNav />
    <div className={styles.grid}>
      <LeftNavPane />
      <div className={styles.flexFill}>
        <Outlet />
      </div>
    </div>
  </div>
);
