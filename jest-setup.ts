import path from "path";

import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import _ from "lodash";

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: "ssim",
  customDiffConfig: {
    ssim: "fast",
  },
  failureThreshold: process.env.CI ? 0.01 : 0.005,
  failureThresholdType: "percent",
  customSnapshotIdentifier: ({ counter, currentTestName, testPath }) => {
    const fileName = getFileNameWithoutExtension(path.basename(testPath));
    return `${_.kebabCase(fileName)}--${process.platform}--${_.kebabCase(
      currentTestName,
    )}--${counter}`;
  },
});

expect.extend({ toMatchImageSnapshot });

if (!process.env.PWDEBUG && !process.env.HEADFUL) {
  jest.setTimeout(90000);
} else {
  jest.setTimeout(3e7);
}
jest.retryTimes(3);

function getFileNameWithoutExtension(fileName: string) {
  return fileName.substr(0, fileName.indexOf("."));
}
