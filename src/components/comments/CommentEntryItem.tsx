import React from "react";

import { getHashColor } from "@/modules/utils";

import { FacePileFace } from "../shared/FacePile";
import { Markdown } from "../shared/Markdown";
import type { MenuOption } from "../shared/Menu";
import { Menu } from "../shared/Menu";

import styles from "./CommentEntryItem.module.css";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";

type CommentEntryItemProps = {
  options?: MenuOption[];
  byName: string;
  dateUpdated?: string;
  text: string;
  isEdit: boolean;
  onEditSubmit: (text: string) => boolean;
  onEditCancel: () => void;
};
export const CommentEntryItem: React.FC<CommentEntryItemProps> = React.memo(
  ({
    byName,
    dateUpdated,
    isEdit,
    onEditCancel,
    onEditSubmit,
    options,
    text,
  }) => {
    const formatedDate =
      dateUpdated &&
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(dateUpdated));
    return (
      <section>
        <div className={styles.heading}>
          <div className={styles.userHeading}>
            <FacePileFace color={getHashColor(byName)} name={byName} />
            <div className={styles.reduced}>
              <h4 className={styles.userNameHeading}>{byName}</h4>
              {formatedDate && (
                <p className={styles.headingDate}>{formatedDate}</p>
              )}
            </div>
          </div>
          {options && (
            <div>
              <Menu options={options} />
            </div>
          )}
        </div>
        <div className={styles.main}>
          {isEdit ? (
            <CommentTextareaWithSave
              onSubmit={onEditSubmit}
              defaultText={text}
              autoFocus
              onCancel={onEditCancel}
            />
          ) : (
            <Markdown text={text} />
          )}
        </div>
      </section>
    );
  }
);

type CommentHeadingProps = {
  byName: string;
  dateUpdated?: string;
  options?: MenuOption[];
};
export const CommentHeading: React.FC<CommentHeadingProps> = ({
  byName,
  dateUpdated,
  options,
}) => {
  const formatedDate =
    dateUpdated &&
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(dateUpdated));
  return (
    <div className={styles.heading}>
      <div className={styles.userHeading}>
        <FacePileFace color={getHashColor(byName)} name={byName} />
        <div className={styles.reduced}>
          <h4 className={styles.userNameHeading}>{byName}</h4>
          {formatedDate && <p className={styles.headingDate}>{formatedDate}</p>}
        </div>
      </div>
      {options?.length && (
        <div>
          <Menu options={options} />
        </div>
      )}
    </div>
  );
};
