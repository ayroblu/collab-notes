import path from "path";

import { test, expect } from "@playwright/test";

import { wait } from "./utils";

const name = "first-time-setup";

test.describe(name, () => {
  /**
   * https://github.com/microsoft/playwright/issues/6347#issuecomment-965887758
   */
  test.beforeEach(async ({ context }) => {
    await context.addInitScript({
      path: path.join(__dirname, "..", "./node_modules/sinon/pkg/sinon.js"),
    });
    await context.addInitScript(() => {
      // @ts-expect-error import from sinon
      window.__clock = sinon.useFakeTimers({
        now: new Date(2022, 0, 1).getTime(),
        shouldAdvanceTime: true,
      });
    });
  });

  test("should successfully create a file when prompted", async ({ page }) => {
    await page.goto("http://localhost:8080");
    await page.locator('[placeholder="filename.ts"]').waitFor();
    await page.addStyleTag({
      content: disableAnimationsCss,
    });
    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "1-initial-load.png",
    ]);
    // expect(await page.screenshot()).toMatchSnapshot([
    //   name,
    //   "1-initial-load.png",
    // ]);
    await page.locator('[placeholder="filename.ts"]').type("tweet.ts");
    await page.keyboard.press("Enter");
    await page.locator('[data-mode-id="typescript"]').waitFor();
    await wait(100);
    // expect(await page.screenshot()).toMatchSnapshot([
    //   name,
    //   "2-typescript-loaded.png",
    // ]);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "2-typescript-loaded.png",
    ]);

    // Check page can't scroll
    await page.click("text=Files");
    await page.mouse.wheel(50, 50);
    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "3-files-list-opened.png",
    ]);
    await page.click("text=Files");

    // Set username for consistency
    await page.click("text=Settings");
    await page.fill('input[name="name"]', "test-user");
    await page.locator('select[name="theme"]').selectOption("vs-dark");
    await page.goBack();

    await page.fill(".monaco-editor textarea", content);
    // expect(await page.screenshot()).toMatchSnapshot([
    //   name,
    //   "3-content-added.png",
    // ]);
    await page.keyboard.press("Control+S");
    await wait(50);
    await page.keyboard.press("ArrowDown");
    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "4-content-added.png",
    ]);

    await page.keyboard.press("ArrowUp");
    await wait(50);
    await page.keyboard.press("ArrowUp");
    await wait(50);
    await page.keyboard.press("Alt+ArrowRight");
    await wait(50);
    await page.keyboard.press("Shift+Alt+ArrowRight");
    await page.click("[data-testid='CommentButton']");
    await page.fill(
      "[placeholder='Add comment...']",
      "Are you sure you want to console.log?",
    );
    await page.keyboard.press("Meta+Enter");
    await wait(50);

    await page.keyboard.press("ArrowUp");
    await wait(50);
    await page.keyboard.press("Alt+ArrowRight");
    await wait(50);
    await page.keyboard.press("Alt+ArrowRight");
    await wait(50);
    await page.keyboard.press("Alt+ArrowLeft");
    await wait(50);
    await page.keyboard.press("Shift+Alt+ArrowRight");
    await wait(50);
    await page.keyboard.press("Shift+Alt+ArrowRight");
    await page.click("[data-testid='CommentButton']");
    await page.fill(
      "[placeholder='Add comment...']",
      "This function doesn't create any Tweets!",
    );
    await page.keyboard.press("Meta+Enter");
    await wait(50);
    await page.keyboard.press("PageUp");
    await wait(50);
    await page.keyboard.press("PageUp");

    const commentItems = [
      ["text=numFollowers", "The people who follow you - how popular you are"],
      [
        "text=numFollowing",
        "The people you follow - how connected you want to be",
      ],
      ["text=User >> nth=0", "User type - should we call them customers"],
      ["text=Tweet >> nth=3", "Tweet type, should probably have more options"],
      [
        "text=author_user_id >> nth=0",
        "I could type this with a string, but using the reference type is more explicit!",
      ],
    ] as const;
    for (const [selector, commentText] of commentItems) {
      await page.dblclick(selector);
      await page.click("[data-testid='CommentButton']");
      await page.fill("[placeholder='Add comment...']", commentText);
      await page.keyboard.press("Meta+Enter");
    }

    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "5-comments-added.png",
    ]);
    await page.click("[data-testid='CommentSettingsButton']");
    await page.click("text=Collapse All");
    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(test.info(), [
      name,
      "6-comments-collapsed.png",
    ]);
  });
});

const content = `
type Tweet = {
  id: string;
  text: string;
  author_user_id: User['id'];
  media: Media[];
  likes: number;
  replies: number;
  quotes: number;
  replyTo?: Tweet['id'];
  topics: string[];
  dateCreated: string;
  dateUpdated: string;
}

type User = {
  id: string;
  name: string;
  numFollowers: number;
  numFollowing: number;
  dateCreated: string;
  dateUpdated: string;
}

type Media = Image | Tweet | Video;
type Image = {
  width: number;
  height: number;
  link_640: string;
  link_1280: string;
}
type Video = {
  width: number;
  height: number;
  link: string;
  type: string;
}
function createTweet(tweet: Tweet) {
  console.log(tweet);
}
`.trim();

const disableAnimationsCss = `
*,
*::before,
*::after {
  -moz-animation: none !important;
  -moz-transition: none !important;
  animation: none !important;
  caret-color: transparent !important;
  transition: none !important;
}
.monaco-editor .cursors-layer .cursor {
  visibility: inherit !important;
}
*::-webkit-scrollbar {
  display: none !important;
}
* {
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
}
`.trim();
