import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";
import { LeftNav } from "./LeftNav";
import { LeftNavPane } from "./LeftNavPane";
import { ParamsSync, SetupSync, Sync } from "./Sync";
import { Spinner } from "./shared/Spinner";

export const Layout: React.FC = () => (
  <SetupSync>
    <Sync />
    <ParamsSync />
    <div className={styles.layout}>
      <LeftNav />
      <div className={styles.grid}>
        <LeftNavPane />
        <div className={styles.flexFill}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  </SetupSync>
);
