import type {
  ImageSnapshotOptions,
  TestInfo,
} from "@ayroblu/playwright-image-snapshot";

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toMatchImageSnapshot(
        testInfo: TestInfo,
        name: string[] | string,
        options?: ImageSnapshotOptions,
      ): R;
    }
  }
}
