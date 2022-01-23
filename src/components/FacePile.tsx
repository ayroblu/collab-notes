import React from "react";

import { getRoom } from "@/modules/documents";

import { SettingsContext } from "./Contexts";
import styles from "./FacePile.module.css";

export const FacePile: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  const [faces, setFaces] = React.useState<Face[]>([]);
  const room = settings.rooms.find(({ id }) => id === settings.activeRoomId);
  React.useEffect(() => {
    if (!room) return;
    const { provider, ydoc } = getRoom(room.id, room.password);
    provider.awareness.on("change", () => {
      const faces = Array.from(provider.awareness.getStates())
        .slice(1)
        .map(
          ([
            clientId,
            {
              user: { colour, name },
            },
          ]) => ({ clientId, name, color: colour })
        )
        .filter(({ clientId }) => clientId !== ydoc.clientID);
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
