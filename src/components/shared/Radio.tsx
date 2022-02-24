import React from "react";

import styles from "./Radio.module.css";

type Props<T extends string> = {
  value: T;
  onChange: (newValue: T) => void;
  items: Readonly<{ label: React.ReactNode; value: T }[]>;
  name: string;
};

export const Radio = <T extends string>({
  items,
  name,
  onChange,
  value,
}: Props<T>) => (
  <section className={styles.radio}>
    {items.map(({ label, value: itemValue }) => (
      <label key={itemValue} className={styles.label}>
        <div className={styles.hoverContainer}>
          <input
            type="radio"
            className={styles.input}
            name={name}
            value={itemValue}
            checked={itemValue === value}
            onChange={() => onChange(itemValue)}
          />
          <div className={styles.radioIcon} />
          <div className={styles.hoverShadow} />
        </div>
        <span className={styles.labelText}>{label}</span>
      </label>
    ))}
  </section>
);
