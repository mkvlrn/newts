import { select } from "@inquirer/prompts";
import { dim, redBright, yellow } from "colorette";
import type { PackageManager } from "~/types.js";

export function promptConfirmation(
  projectName: string,
  projectType: string,
  installPackages: boolean,
  packageManager: PackageManager,
  gitInit: boolean,
) {
  const highlightType = redBright(projectType.split("-").pop() ?? "Unknown");
  const highlightProject = redBright(`./${projectName}`);
  const highlightPackageInstallation = installPackages
    ? redBright(`will be installed with ${packageManager}`)
    : redBright("will not be installed");
  const highlightGitInit = redBright(`will ${gitInit ? "" : "not "}be initialized`);
  let message = `This will create a ${highlightType} project in ${highlightProject}, `;
  message += `packages ${highlightPackageInstallation}, and a git repository `;
  message += `${highlightGitInit}.`;

  return select({
    message: dim(yellow(`${message} Continue?`)),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
