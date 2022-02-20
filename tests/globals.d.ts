import type {
  ImageSnapshotOptions,
  TestInfo,
} from "@ayroblu/playwright-image-snapshot";
import type { SinonFakeTimers } from "sinon";

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
  interface Window {
    __clock: SinonFakeTimers;
  }
}
