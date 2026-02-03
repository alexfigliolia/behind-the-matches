import { RepoKitConfig } from "@repokit/core";

/**
 * Please fill out this config file with your desired
 * repokit settings
 */
export const RepoKit = new RepoKitConfig({
  project: "BHM",
  commands: {
    "build:fe": {
      command: "yarn next build",
      description: "build for production",
    },
    "compress:fe": {
      command: "ui-build-compression $(pwd)/.next/static",
      description: "build for production",
    },
    "build:production": {
      command: "repokit build:fe && repokit compress:fe",
      description: "Build and compress for production release",
    },
  },
});
