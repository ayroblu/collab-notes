import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { addThread, editComment, removeComment } from "@/modules/documents";
import type { CommentData, SelectionRange } from "@/modules/documents/types";
import { cn, nonNullable } from "@/modules/utils";

import { CommentsContext, EditorContext } from "../Contexts";
import {
  activeFileNameState,
  activeRoomIdSelector,
  commentCollapsedState,
  commentSizeSelector,
  focusCommentIsActiveState,
  focusNearestCommentIdSelector,
  inProgressCommentsSelector,
  settingsSelector,
} from "../data-model";
import {
  useComments,
  useFileName,
  useFileParams,
  useRoom,
  useSetFocusCommentIdState,
} from "../utils";

import styles from "./Comment.module.css";
import { CollapsedCommentItem, CommentEntryItem } from "./CommentEntryItem";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";
import { CommentThread } from "./CommentThread";
import { useCommentHeight } from "./useCommentHeight";

type Props = CommentData & {
  offset: number | undefined;
  isFocusComment: boolean;
  isActiveComment: boolean;
};

export const Comment: React.FC<Props> = React.memo(
  ({ isActiveComment, isFocusComment, offset, ...comment }) => {
    const { id, isResolved } = comment;
    const isCollapsed = useRecoilValue(commentCollapsedState(id));

    return (
      <CommentHolder
        {...comment}
        offset={offset}
        isFocusComment={isFocusComment}
        isActiveComment={isActiveComment}
      >
        <CommentMain
          {...comment}
          isFocusComment={isFocusComment}
          isActiveComment={isActiveComment}
        />
        {(!isCollapsed || isActiveComment) && !isResolved && (
          <CommentThread commentId={id} />
        )}
        {isActiveComment && !isResolved && <div className={styles.ruledLine} />}
        {isActiveComment && !isResolved && <CommentAddThread commentId={id} />}
      </CommentHolder>
    );
  },
);

type CommentHolderProps = {
  id: string;
  offset: number | undefined;
  selection: SelectionRange;
  isResolved?: boolean;
  isFocusComment: boolean;
  isActiveComment: boolean;
};
export const CommentHolder: React.FC<CommentHolderProps> = ({
  children,
  id,
  isActiveComment,
  isFocusComment,
  isResolved,
  offset,
  selection,
}) => {
  const { commentRefs } = React.useContext(CommentsContext);
  const setFocusCommentId = useSetFocusCommentIdState();
  const roomId = useRecoilValue(activeRoomIdSelector);
  const fileName = useRecoilValue(activeFileNameState(roomId));
  const setFocusCommentIsActive = useSetRecoilState(
    focusCommentIsActiveState({ fileName, roomId }),
  );
  const setCommentSize = useSetRecoilState(
    commentSizeSelector({ commentIds: [id] }),
  );
  const observer = useCommentHeight(id);
  const position = usePosition(selection);
  const offsetTop =
    nonNullable(position) && nonNullable(offset)
      ? position + offset
      : nonNullable(position)
      ? position
      : 0;
  const offsetLeft = isActiveComment ? "-32px" : "0";
  const handleRef = React.useCallback(
    (r: HTMLElement | null) => {
      if (!r || typeof position !== "number") return;

      const height = r.offsetHeight;
      commentRefs.current[id] = r;
      setCommentSize([{ id, top: position, height }]);
      observer();
    },
    [commentRefs, id, observer, position, setCommentSize],
  );

  return (
    <section
      ref={handleRef}
      data-testid="Comment"
      className={cn(
        styles.comment,
        isFocusComment && styles.focus,
        isResolved && styles.resolved,
      )}
      style={{
        transform: `translate(${offsetLeft}, ${offsetTop}px)`,
        display: !nonNullable(position) ? "none" : undefined,
      }}
      onClick={React.useCallback(() => {
        setFocusCommentId(id);
        setFocusCommentIsActive(true);
      }, [id, setFocusCommentId, setFocusCommentIsActive])}
    >
      {children}
    </section>
  );
};

const CommentAddThread: React.FC<{ commentId: string }> = React.memo(
  ({ commentId }) => {
    const room = useRoom();
    const fileName = useFileName();
    const settings = useRecoilValue(settingsSelector);

    const addThreadHandler = (text: string) =>
      addThread({
        roomId: room.id,
        roomPassword: room.password,
        fileName,
        commentId,
        text,
        byId: settings.id,
        byName: settings.name,
      });
    return (
      <section className={styles.addThread}>
        <CommentTextareaWithSave onSubmit={addThreadHandler} />
      </section>
    );
  },
);

const CommentMain: React.FC<
  CommentData & { isFocusComment: boolean; isActiveComment: boolean }
> = React.memo(
  ({
    byName,
    dateUpdated,
    id,
    isActiveComment,
    isFocusComment,
    isResolved,
    text,
  }) => {
    const [isEdit, setIsEdit] = React.useState(false);
    const { commentRefs } = React.useContext(CommentsContext);
    const { fileName, roomId, roomPassword } = useFileParams();
    const setFocusCommentId = useSetFocusCommentIdState();
    const setFocusCommentIsActive = useSetRecoilState(
      focusCommentIsActiveState({ fileName, roomId }),
    );
    const inProgressComments = useRecoilValue(inProgressCommentsSelector);
    const comments = useComments();
    const setNearestFocusCommentId = useSetRecoilState(
      focusNearestCommentIdSelector,
    );

    const onEditSubmit = React.useCallback(
      (text: string) => {
        editComment(roomId, roomPassword, fileName, id, text);
        setIsEdit(false);
        return false;
      },
      [fileName, id, roomId, roomPassword],
    );
    const onEditCancel = React.useCallback(() => {
      setIsEdit(false);
    }, []);
    const deleteComment = React.useCallback(() => {
      const success = removeComment(roomId, roomPassword, fileName, id);
      if (!success) return;

      if (isFocusComment) {
        const commentIds = comments
          .concat(inProgressComments)
          .map(({ id }) => id);
        setNearestFocusCommentId({ commentIds, commentId: id });
        setFocusCommentIsActive(false);
      }
      delete commentRefs.current[id];
    }, [
      commentRefs,
      comments,
      fileName,
      id,
      inProgressComments,
      isFocusComment,
      roomId,
      roomPassword,
      setFocusCommentIsActive,
      setNearestFocusCommentId,
    ]);
    const onEdit = React.useCallback(() => {
      setIsEdit(true);
      setFocusCommentId(id);
      setFocusCommentIsActive(true);
    }, [id, setFocusCommentId, setFocusCommentIsActive]);
    const [isCollapsed, setIsCollapsed] = useRecoilState(
      commentCollapsedState(id),
    );
    const onCollapse = React.useCallback(() => {
      setIsCollapsed(!isCollapsed);
      if (!isCollapsed) {
        setFocusCommentIsActive(false);
      }
    }, [isCollapsed, setFocusCommentIsActive, setIsCollapsed]);
    const options = React.useMemo(
      () => [
        { label: isCollapsed ? "Uncollapse" : "Collapse", onClick: onCollapse },
        { label: "Edit", onClick: onEdit },
        { label: "Delete", onClick: deleteComment },
      ],
      [deleteComment, isCollapsed, onCollapse, onEdit],
    );
    if (!isCollapsed || isActiveComment) {
      return (
        <CommentEntryItem
          isResolved={isResolved}
          resolveCommentId={id}
          byName={byName}
          options={options}
          text={text}
          dateUpdated={dateUpdated}
          isEdit={isEdit}
          onEditSubmit={onEditSubmit}
          onEditCancel={onEditCancel}
        />
      );
    } else {
      return <CollapsedCommentItem byName={byName} text={text} />;
    }
  },
);

const usePosition = (selection: SelectionRange) => {
  const { editor, editorDivRef } = React.useContext(EditorContext);

  if (!editor) return;
  const editorDiv = editorDivRef.current;
  if (!editorDiv) return;
  const top = editor.getTopForPosition(
    selection.startLineNumber,
    selection.startColumn,
  );
  const lineHeight = editor.getRawOptions().lineHeight || 24;
  return top - lineHeight;
};
