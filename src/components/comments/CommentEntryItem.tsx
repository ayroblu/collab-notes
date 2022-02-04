import React from "react";

import { getHashColor } from "@/modules/utils";

import { FacePileFace } from "../shared/FacePile";
import type { MenuOption } from "../shared/Menu";
import { Menu } from "../shared/Menu";

import styles from "./CommentEntryItem.module.css";
import { CommentTextareaWithSave } from "./CommentTextareaWithSave";

type CommentEntryItemProps = {
  options: MenuOption[];
  byName: string;
  dateUpdated: string;
  text: string;
  isEdit: boolean;
  onEditSubmit: (text: string) => boolean;
};
export const CommentEntryItem: React.FC<CommentEntryItemProps> = ({
  byName,
  dateUpdated,
  isEdit,
  onEditSubmit,
  options,
  text,
}) => {
  const formatedDate = new Intl.DateTimeFormat("en-GB", {
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
            <p className={styles.headingDate}>{formatedDate}</p>
          </div>
        </div>
        <div>
          <Menu options={options} />
        </div>
      </div>
      {isEdit ? (
        <CommentTextareaWithSave
          onSubmit={onEditSubmit}
          defaultText={text}
          autoFocus
        />
      ) : (
        <p className={styles.text}>{text}</p>
      )}
    </section>
  );
};
