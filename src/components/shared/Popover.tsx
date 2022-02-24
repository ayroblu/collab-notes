import React from "react";

import { Button } from "./Button";
import styles from "./Popover.module.css";

type Props = {
  anchor: React.ReactNode;
};

export const Popover: React.FC<Props> = ({ anchor, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isVisible) return;
    let timeoutId = 0;
    const handler = () => {
      timeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, 100);
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);
  // const containerRef = React.useRef<HTMLDivElement | null>(null);
  // React.useEffect(() => {
  //   if (!isVisible) return;
  //   const el = containerRef.current;
  //   if (!el) return;
  //   // https://gomakethings.com/detecting-when-focus-leaves-a-group-of-elements-with-vanilla-js/
  //   let timeoutId = 0;
  //   const focusHandler = (e: FocusEvent) => {
  //     if (el.contains(e.relatedTarget as any)) return;

  //     timeoutId = window.setTimeout(() => {
  //       setIsVisible(false);
  //     }, 100);
  //   };
  //   el.addEventListener("focusout", focusHandler);
  //   return () => {
  //     el.removeEventListener("focusout", focusHandler);
  //     clearTimeout(timeoutId);
  //   };
  // }, [isVisible]);
  const onClick = React.useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [],
  );
  // onClick={(e) => e.stopPropagation()}
  return (
    <div className={styles.popoverContainer}>
      <Button className={styles.center} onClick={onClick}>
        {anchor}
      </Button>
      {isVisible && <section className={styles.popover}>{children}</section>}
    </div>
  );
};
