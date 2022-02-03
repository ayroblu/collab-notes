import React from "react";
import { VscChevronDown } from "react-icons/vsc";

import { cn } from "@/modules/utils";

import styles from "./Menu.module.css";

export type MenuOption = {
  label: React.ReactNode;
  onClick: () => void;
};
type Props = {
  options: MenuOption[];
};
export const Menu: React.FC<Props> = ({ options }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };
  const toggle = () => {
    setIsOpen(!isOpen);
    setSelectedIndex(0);
  };
  const reset = () => {
    setIsOpen(false);
    setSelectedIndex(0);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        return setSelectedIndex(
          (selectedIndex + options.length - 1) % options.length
        );
      case "ArrowDown":
        e.preventDefault();
        return setSelectedIndex((selectedIndex + 1) % options.length);
      case "Escape":
        return reset();
    }
  };

  return (
    <button
      className={styles.menu}
      onKeyDown={handleKeyDown}
      onClick={onClickHandler}
      onBlur={reset}
    >
      <VscChevronDown />
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(({ label, onClick }, i) => (
            <li key={i}>
              <div
                className={cn(
                  styles.menuItem,
                  selectedIndex === i && styles.menuItemSelected
                )}
                onClick={onClick}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                {label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};
