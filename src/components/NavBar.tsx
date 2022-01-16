import React from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("name");
  if (!fileName) return null;
  return (
    <section className={styles.nav}>
      <h3 className={styles.pageTitle}>{fileName}</h3>
      <FacePile />
    </section>
  );
};

const FacePile: React.FC = () => {
  const faces: Face[] = [
    { name: "first", color: "red" },
    { name: "second", color: "blue" },
  ];
  if (faces.length < 6) {
    return (
      <section className={styles.facepile}>
        {faces.map(({ color, name }) => (
          <FacePileFace key={`${name}${color}`} color={color} name={name} />
        ))}
      </section>
    );
  }
  return (
    <section className={styles.facepile}>
      <CondensedFacePile faces={faces} />
    </section>
  );
};

const FacePileFace: React.FC<Face> = ({ color, name }) => {
  const char = name.slice(0, 1);
  return (
    <section className={styles.face} style={{ color }}>
      {char}
    </section>
  );
};
type Face = {
  name: string;
  color: string;
};

const CondensedFacePile: React.FC<{ faces: Face[] }> = ({ faces }) => {
  // Top circle is number
  // Subsequent circles are overlapping
  return null;
};
