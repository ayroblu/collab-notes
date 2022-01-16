import React from "react";
import { useSearchParams } from "react-router-dom";

import { getRoom } from "@/modules/documents";

import { SettingsContext } from "./Contexts";
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
  const { settings } = React.useContext(SettingsContext);
  const [faces, setFaces] = React.useState<Face[]>([]);
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  React.useEffect(() => {
    if (!room) return;
    const { provider } = getRoom(room.id, room.password);
    provider.awareness.on("change", () => {
      const faces = Array.from(provider.awareness.getStates())
        .slice(1)
        .map(
          ([
            ,
            {
              user: { colour, name },
            },
          ]) => ({ name, color: colour })
        );
      setFaces(faces);
    });
  }, []);
  if (!room) return null;
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
  const char = name.slice(0, 1).toLocaleUpperCase();
  return (
    <section
      className={styles.face}
      style={{ backgroundColor: color }}
      title={name}
    >
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
  const topFaces = faces.slice(0, 3);
  return (
    <div className={styles.overlap}>
      {topFaces.reverse().map(({ color, name }) => (
        <FacePileFace key={`${name}${color}`} color={color} name={name} />
      ))}
      <FacePileFace
        color={"#5bf"}
        name={`${faces.length} people are looking at this document`}
      />
    </div>
  );
};
