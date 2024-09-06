import { select } from "@inquirer/prompts";
import { dim, yellow } from "colorette";
import type { PackageManager } from "~/types.js";

export function promptPackageManager(availablePackageManagers: PackageManager[]) {
  const knownPackageManagers: PackageManager[] = ["npm", "yarn", "pnpm"];
  return select({
    message: dim(yellow("Package manager")),
    choices: knownPackageManagers.map((packageManager) => ({
      value: packageManager,
      name: packageManager,
      disabled: availablePackageManagers.includes(packageManager)
        ? false
        : "not available",
    })),
  });
}
