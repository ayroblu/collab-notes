import React from "react";

import { cn } from "@/modules/utils";

import styles from "./Drawer.module.css";

type Props = {
  isFixed?: boolean;
  position: "end" | "start";
  isVisible: boolean;
  setIsVisible: React.Dispatch<boolean>;
};

export const Drawer: React.FC<Props> = ({
  children,
  isFixed,
  isVisible,
  position,
  setIsVisible,
}) => {
  const onBackgroundClick = React.useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);
  const stopPropagation = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => e.stopPropagation(),
    [],
  );

  if (!isVisible) return null;
  return (
    <section
      className={cn(styles.background, isFixed && styles.fixed)}
      onClick={onBackgroundClick}
    >
      <div
        className={cn(
          styles.drawer,
          position === "start" ? styles.start : styles.end,
          isFixed && styles.fixed,
        )}
        onClick={stopPropagation}
      >
        {children}
      </div>
    </section>
  );
};
