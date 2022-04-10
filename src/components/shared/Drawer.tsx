import React from "react";

import { cn } from "@/modules/utils";

import styles from "./Drawer.module.css";

type Props = {
  isFixed?: boolean;
  position: "end" | "start";
  isVisible: boolean;
  setIsVisible: React.Dispatch<boolean>;
  preserveOffscreen?: boolean;
  drawerClassName?: string;
};

export const Drawer: React.FC<Props> = ({
  children,
  drawerClassName,
  isFixed,
  isVisible,
  position,
  preserveOffscreen,
  setIsVisible,
}) => {
  const onBackgroundClick = React.useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);
  const stopPropagation = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  );

  if (!preserveOffscreen && !isVisible) return null;
  return (
    <section
      className={cn(
        styles.background,
        isFixed && styles.fixed,
        !isVisible && styles.invisible,
      )}
      onClick={onBackgroundClick}
    >
      <div
        className={cn(
          styles.drawer,
          position === "start" ? styles.start : styles.end,
          isFixed && styles.fixed,
          preserveOffscreen &&
            (!isVisible ? styles.offscreen : styles.onscreen),
          drawerClassName,
        )}
        onClick={stopPropagation}
      >
        {children}
      </div>
    </section>
  );
};
