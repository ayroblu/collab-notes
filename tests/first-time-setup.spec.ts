import { test, expect } from "@playwright/test";

import { wait } from "./utils";

const name = "first-time-setup";

test.describe(name, () => {
  test("should successfully create a file when prompted", async ({ page }) => {
    await page.addStyleTag({
      content: disableAnimationsCss,
    });

    await page.goto("http://localhost:8080", { timeout: 60_000 });
    await page.locator('[placeholder="filename.ts"]').waitFor();
    await wait(100);
    expect(await page.screenshot()).toMatchImageSnapshot(
      test.info(),
      "1-initial-load",
    );
    await page.locator('[placeholder="filename.ts"]').type("tweet.ts");
    await page.keyboard.press("Enter");
    await page.locator('[data-mode-id="typescript"]').waitFor();
    await wait(100);
    // expect(await page.screenshot()).toMatchSnapshot([
    //   name,
    //   "2-typescript-loaded.png",
    // ]);
    expect(await page.screenshot()).toMatchImageSnapshot(
      test.info(),
      "2-typescript-loaded.png",
    );
    await page.fill(".monaco-editor textarea", content);
    // await page.type("input", content);
    // await page.fill("input", content);
    await wait(100);
    // expect(await page.screenshot()).toMatchSnapshot([
    //   name,
    //   "3-content-added.png",
    // ]);
    expect(await page.screenshot()).toMatchImageSnapshot(
      test.info(),
      "3-content-added.png",
    );
  });
});

const content = `
type Tweet = {
  text: string,
  dateCreated: string,
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
`.trim();
