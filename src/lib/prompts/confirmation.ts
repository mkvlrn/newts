import { select } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";
import type { PackageManager } from "~/types.js";

export function promptConfirmation(
  projectName: string,
  projectType: string,
  installPackages: boolean,
  packageManager: PackageManager,
  gitInit: boolean,
) {
  const highlightType = chalk.redBright(projectType.split("-").pop());
  const highlightProject = chalk.redBright(`./${projectName}`);
  const highlightPackageInstallation = installPackages
    ? chalk.redBright(`will be installed with ${packageManager}`)
    : chalk.redBright("will not be installed");
  const highlightGitInit = chalk.redBright(
    `will ${gitInit ? "" : "not "}be initialized`,
  );
  let message = `This will create a ${highlightType} project in ${highlightProject}, `;
  message += `packages ${highlightPackageInstallation}, and a git repository `;
  message += `${highlightGitInit}.`;

  return select({
    message: chalk.dim.yellow(`${message} Continue?`),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
