import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  activeRoomIdSelector,
  threadsSelector,
  threadState,
} from "../data-model";
import { useFileName } from "../utils";

export const useThreadValue = (commentId: string) => {
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useFileName();
  return useRecoilValue(threadState({ roomId, fileName, commentId }));
};

export const useSetThreads = () => {
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useFileName();
  return useSetRecoilState(threadsSelector({ roomId, fileName }));
};
