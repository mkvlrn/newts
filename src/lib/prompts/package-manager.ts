import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";
import { type PackageManager, packageManagers } from "~/types";

export function promptPackageManager(availablePackageManagers: PackageManager[]) {
  return prompts.select({
    message: colorette.dim(colorette.yellow("Package manager")),
    choices: packageManagers.map((packageManager) => ({
      value: packageManager,
      name: packageManager,
      disabled: availablePackageManagers.includes(packageManager) ? false : "not available",
    })),
  });
}
