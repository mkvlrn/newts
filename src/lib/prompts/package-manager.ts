import { select } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";
import type { PackageManager } from "~/types.js";

export function promptPackageManager(availablePackageManagers: PackageManager[]) {
  const knownPackageManagers: PackageManager[] = ["npm", "yarn", "pnpm"];
  return select({
    message: chalk.dim.yellow("Package manager"),
    choices: knownPackageManagers.map((packageManager) => ({
      value: packageManager,
      name: packageManager,
      disabled: availablePackageManagers.includes(packageManager)
        ? false
        : "not available",
    })),
  });
}
