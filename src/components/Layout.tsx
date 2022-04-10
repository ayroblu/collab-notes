import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { getIsVerySmallScreen } from "@/modules/utils";

import styles from "./Layout.module.css";
import { LeftNav } from "./LeftNav";
import { LeftNavPane } from "./LeftNavPane";
import { ParamsSync, SetupSync, Sync } from "./Sync";
import { Spinner } from "./shared/Spinner";

export const Layout: React.FC = () => {
  const height = useVisualViewport();

  return (
    <SetupSync>
      <Sync />
      <ParamsSync />
      <div className={styles.layout}>
        <LeftNav />
        <div className={styles.grid} style={{ height }}>
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
};

const useVisualViewport = () => {
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;
    setHeight(visualViewport.height);
    const func = () => {
      setHeight(visualViewport.height);
    };
    visualViewport.addEventListener("resize", func);
    return () => {
      visualViewport.removeEventListener("resize", func);
    };
  }, []);

  return getIsVerySmallScreen() ? height - 50 : "auto";
};
