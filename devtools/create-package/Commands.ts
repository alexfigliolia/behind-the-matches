import { RepoKitCommand } from "@repokit/core";

export const Commands = new RepoKitCommand({
  name: "packages",
  description: "Package management tools",
  commands: {
    create: {
      command: "npx tsx ./CLI.ts",
      description: "Create a new package",
    },
  },
});
