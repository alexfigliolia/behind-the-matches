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
  },
});
