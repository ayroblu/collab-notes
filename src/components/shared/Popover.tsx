import React from "react";

import styles from "./Popover.module.css";

type Props = {
  anchor: React.ReactNode;
};

export const Popover: React.FC<Props> = ({ anchor, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isVisible) return;
    const el = containerRef.current;
    if (!el) return;
    // https://gomakethings.com/detecting-when-focus-leaves-a-group-of-elements-with-vanilla-js/
    const focusHandler = (e: FocusEvent) => {
      if (el.contains(e.relatedTarget as any)) return;

      setIsVisible(false);
    };
    el.addEventListener("focusout", focusHandler);
    return () => {
      el.removeEventListener("focusout", focusHandler);
    };
  }, [isVisible]);
  const onClick = React.useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [],
  );
  // const onBlur = React.useCallback(() => setIsVisible(false), []);
  return (
    <div className={styles.popoverContainer} ref={containerRef}>
      <button onClick={onClick}>{anchor}</button>
      {isVisible && (
        <section
          className={styles.popover}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>
      )}
    </div>
  );
};
