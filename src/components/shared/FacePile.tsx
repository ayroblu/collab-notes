import React from "react";
import { useRecoilValue } from "recoil";

import type { AwarenessStates } from "@/modules/documents";
import { getRoom } from "@/modules/documents";
import { uniqBy } from "@/modules/utils";

import { settingsState } from "../data-model";
import { useRoom } from "../utils";

import styles from "./FacePile.module.css";

export const FacePile: React.FC = () => {
  const settings = useRecoilValue(settingsState);
  const [faces, setFaces] = React.useState<Face[]>([]);
  const room = useRoom();
  React.useEffect(() => {
    if (!room) return;
    const { provider, ydoc } = getRoom(room.id, room.password);
    provider.awareness.on("change", () => {
      const faces = Array.from(
        provider.awareness.getStates() as AwarenessStates
      )
        .slice(1)
        .filter(([, { user }]) => user)
        .map(
          ([
            clientId,
            {
              user: { colour, id, name },
            },
          ]) => ({ clientId, name, color: colour, id })
        )
        .filter(
          ({ clientId, id }) => clientId !== ydoc.clientID && id !== settings.id
        );
      setFaces(uniqBy(faces, ({ id }) => id));
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

export const FacePileFace: React.FC<Face> = ({ color, name }) => {
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
