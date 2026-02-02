import { RepoKitCommand } from "@repokit/core";

export const Commands = new RepoKitCommand({
  name: "models",
  description: "Tools for 3D Models",
  commands: {
    optimize: {
      command: "npx tsx ./CLI.ts",
      description: "Compresses model textures using KTX2",
    },
  },
});
