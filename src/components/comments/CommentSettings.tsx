import { useRecoilState } from "recoil";

import { commentCollapsedSelector, showCommentsState } from "../data-model";
import { Button } from "../shared/Button";
import { Radio } from "../shared/Radio";
import { useAllComments, useFileParams } from "../utils";

import styles from "./CommentSettings.module.css";

export const CommentSettings: React.FC = () => {
  const { fileName, roomId } = useFileParams();
  const [showComments, setShowComments] = useRecoilState(
    showCommentsState({ fileName, roomId }),
  );
  const comments = useAllComments();
  const [isCollapsed, setAllCommentsCollapsed] = useRecoilState(
    commentCollapsedSelector({ commentIds: comments.map(({ id }) => id) }),
  );
  const numResolved = comments.filter(({ isResolved }) => isResolved).length;
  const numOpen = comments.filter(({ isResolved }) => !isResolved).length;
  // const [showResolvedComments, setShowResolvedComments] = useRecoilState(
  //   showResolvedCommentsState({ fileName, roomId }),
  // );
  // const [showOpenComments, setShowOpenComments] = useRecoilState(
  //   showOpenCommentsState({ fileName, roomId }),
  // );
  // const values = {
  //   resolved: showResolvedComments,
  //   open: showOpenComments,
  // };
  const settingsItems = [
    {
      label: `Resolved (${numResolved})`,
      value: "resolved",
    },
    {
      label: `Open (${numOpen})`,
      value: "open",
    },
  ] as const;
  const onChange = (key: "open" | "resolved") => {
    setShowComments(key);
  };
  if (!comments.length) {
    return null;
  }
  // <CheckList
  //   name="comment-settings"
  //   items={settingsItems}
  //   values={values}
  //   onChange={onChange}
  // />
  return (
    <section className={styles.commentSettings}>
      Comment Settings
      {numResolved > 0 && (
        <Radio
          name="comment-settings"
          items={settingsItems}
          value={showComments}
          onChange={onChange}
        />
      )}
      <hr className={styles.divider} />
      {isCollapsed ? (
        <Button
          className={styles.button}
          onClick={() => setAllCommentsCollapsed(false)}
        >
          Expand All
        </Button>
      ) : (
        <Button
          className={styles.button}
          onClick={() => setAllCommentsCollapsed(true)}
        >
          Collapse All
        </Button>
      )}
    </section>
  );
};
