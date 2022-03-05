import React from "react";

import { Button } from "./Button";
import styles from "./Popover.module.css";

type Props = {
  anchor: React.ReactNode;
  buttonTestId?: string;
};

export const Popover: React.FC<Props> = ({
  anchor,
  buttonTestId,
  children,
}) => {
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

  const onClick = React.useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [],
  );

  return (
    <div className={styles.popoverContainer}>
      <Button
        className={styles.center}
        data-testid={buttonTestId}
        onClick={onClick}
      >
        {anchor}
      </Button>
      {isVisible && <section className={styles.popover}>{children}</section>}
    </div>
  );
};
