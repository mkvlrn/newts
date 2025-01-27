import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";
import fs from "node:fs/promises";
import type { GithubRepoResponse } from "~/types";
import { type PackageManager, packageManagers } from "~/types";

export function projectType(templateList: GithubRepoResponse[]) {
  return prompts.select({
    pageSize: 10,
    loop: false,
    message: colorette.dim(colorette.yellow("Project type")),
    choices: templateList.map((template) => ({
      name: formatSelectName(template),
      value: template.name,
      short: template.name.replace("template-", ""),
    })),
  });
}

function formatSelectName(template: GithubRepoResponse) {
  const updatedDaysAgo =
    (Date.now() - new Date(template.updated_at).getTime()) / (1000 * 60 * 60 * 24);

  let name = template.name.replace("template-", "");
  name += ` - ${template.description}`;
  name += `\n    updated ${updatedDaysAgo.toFixed(0)} days ago`;

  return name;
}

export async function projectName() {
  return await prompts.input({
    message: colorette.dim(colorette.yellow("Project name")),
    default: "my-project",
    validate: async (projectName) => {
      const isValidFilename = /^[A-Za-z][\w.-]*$/g.test(projectName);
      if (!isValidFilename) {
        return "Please enter a valid directory name for your project.";
      }

      try {
        await fs.access(projectName);
        return "A directory with this name already exists.";
      } catch {
        return true;
      }
    },
  });
}

export function packageManager(availablePackageManagers: PackageManager[]) {
  return prompts.select({
    message: colorette.dim(colorette.yellow("Package manager")),
    choices: packageManagers.map((packageManager) => ({
      value: packageManager,
      name: packageManager,
      disabled: availablePackageManagers.includes(packageManager) ? false : "not available",
    })),
  });
}

export function installPackages() {
  return prompts.select({
    message: colorette.dim(colorette.yellow("Install packages?")),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}

export async function gitInit() {
  const message = colorette.dim(colorette.yellow("Initialize git and create first commit ?"));

  return await prompts.select({
    message,
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}

export function confirmation(
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
  let message = `This will create a ${highlightType} project in ${highlightProject}.\n`;
  message += `Packages ${highlightPackageInstallation}.\n`;
  message += `A git repository ${highlightGitInit}.\n`;

  return prompts.select({
    message: colorette.dim(colorette.yellow(`${message}Continue?`)),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
