import * as Y from "yjs";

import { uuidv4 } from "../utils";

import type { ThreadData } from "./types";

import { getFileFromFileName, getRoom, getYFileThreads } from ".";

export function getAllThreads(
  roomId: string,
  roomPassword: string,
  fileName: string,
): Y.Map<Y.Array<ThreadData>> | void {
  const file = getFileFromFileName(roomId, roomPassword, fileName);
  if (!file) return;
  return getYFileThreads(file);
}

export function getThreads(
  roomId: string,
  roomPassword: string,
  fileName: string,
  commentId: string,
): Y.Array<ThreadData> | void {
  const threads = getAllThreads(roomId, roomPassword, fileName);
  if (!threads) return;
  if (!threads.has(commentId)) {
    threads.set(commentId, new Y.Array<ThreadData>());
  }
  return threads.get(commentId)!;
}

type CommentParams = {
  roomId: string;
  roomPassword: string;
  fileName: string;
  commentId: string;
};
type AddThreadParams = CommentParams & {
  text: string;
  byId: string;
  byName: string;
};
export function addThread({
  byId,
  byName,
  commentId,
  fileName,
  roomId,
  roomPassword,
  text,
}: AddThreadParams): boolean {
  const thread = getThreads(roomId, roomPassword, fileName, commentId);
  if (text && thread) {
    const now = new Date().toISOString();
    thread.push([
      {
        id: uuidv4(),
        commentId,
        text,
        byId,
        byName,
        dateCreated: now,
        dateUpdated: now,
      },
    ]);
    return true;
  }
  return false;
}

type ThreadParams = CommentParams & {
  threadId: string;
};
type EditThreadParams = ThreadParams & {
  text: string;
};
export function editThread({
  commentId,
  fileName,
  roomId,
  roomPassword,
  text,
  threadId,
}: EditThreadParams) {
  const { ydoc } = getRoom(roomId, roomPassword);
  const threads = getThreads(roomId, roomPassword, fileName, commentId);
  if (!threads) return;
  const index = threads.map(({ id }) => id).findIndex((id) => id === threadId);

  const now = new Date().toISOString();
  const thread = threads.get(index);
  ydoc.transact(() => {
    threads.delete(index);
    threads.insert(index, [{ ...thread, text, dateUpdated: now }]);
  });
}

export function removeThread({
  commentId,
  fileName,
  roomId,
  roomPassword,
  threadId,
}: ThreadParams): boolean {
  const thread = getThreads(roomId, roomPassword, fileName, commentId);
  if (thread) {
    const index = thread.map(({ id }) => id).findIndex((id) => id === threadId);
    if (index !== -1) {
      thread.delete(index, 1);
    }
    return true;
  }
  return false;
}
