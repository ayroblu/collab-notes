import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { activeRoomIdSelector } from "./data-model";

export const RoomRedirect: React.FC = () => {
  const activeRoomId = useRecoilValue(activeRoomIdSelector);

  return <Navigate replace to={activeRoomId} />;
};
