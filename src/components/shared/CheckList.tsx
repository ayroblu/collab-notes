import React from "react";

import styles from "./CheckList.module.css";

type Props<T extends string> = {
  name: string;
  values: { [key in T]: boolean };
  onChange: (value: T) => void;
  items: Readonly<{ label: React.ReactNode; value: T }[]>;
};

export const CheckList = <T extends string>({
  items,
  name,
  onChange,
  values,
}: Props<T>) => (
  <section className={styles.checklist}>
    {items.map(({ label, value }) => (
      <label key={value} className={styles.label}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={values[value]}
          onChange={() => onChange(value)}
        />
        <span className={styles.labelText}>{label}</span>
      </label>
    ))}
  </section>
);
