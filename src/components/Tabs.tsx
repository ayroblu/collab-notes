import React from "react";

import { cn } from "@/modules/utils";

import styles from "./Tabs.module.css";

type Props = {
  tabs: { name: string; component: React.ReactElement }[];
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
};
export const Tabs: React.FC<Props> = ({ setTabIndex, tabIndex, tabs }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ name }, i) => (
        <Tab
          name={name}
          key={name}
          focused={tabIndex === i}
          onChange={() => setTabIndex(i)}
        />
      ))}
      {tabs[tabIndex]!.component}
    </div>
  );
};

type TabProps = {
  name: string;
  focused: boolean;
  onChange: () => void;
};
const Tab: React.FC<TabProps> = ({ focused, name, onChange }) => {
  return (
    <div
      className={cn(styles.tab, focused && styles.tabFocus)}
      onClick={onChange}
      tabIndex={0}
    >
      {name}
    </div>
  );
};
