import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";
import type { PackageManager } from "~/types";

export function promptConfirmation(
  projectName: string,
  projectType: string,
  installPackages: boolean,
  packageManager: PackageManager,
  gitInit: boolean,
) {
  const highlightType = colorette.redBright(projectType.split("-").pop() ?? "Unknown");
  const highlightProject = colorette.redBright(`./${projectName}`);
  const highlightPackageInstallation = installPackages
    ? colorette.redBright(`will be installed with ${packageManager}`)
    : colorette.redBright("will not be installed");
  const highlightGitInit = colorette.redBright(`will ${gitInit ? "" : "not "}be initialized`);
  let message = `This will create a ${highlightType} project in ${highlightProject}, `;
  message += `packages ${highlightPackageInstallation}, and a git repository `;
  message += `${highlightGitInit}.`;

  return prompts.select({
    message: colorette.dim(colorette.yellow(`${message} Continue?`)),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
