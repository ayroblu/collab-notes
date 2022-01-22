import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";

import { cn } from "@/modules/utils";

import styles from "./LeftNavButton.module.css";

export const LeftNavButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { isHighlight?: boolean }
> = ({ isHighlight, ...props }) => {
  return (
    <button
      className={cn(styles.leftNavButton, isHighlight && styles.highlight)}
      {...props}
    />
  );
};

export const LeftNavButtonLink: React.FC<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
> = (props) => {
  return <Link {...props} className={styles.leftNavButton} />;
};
