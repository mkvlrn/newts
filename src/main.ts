#!/usr/bin/env node
import path from "node:path";
import ora from "ora";
import { fetchRepo } from "~/lib/github/fetch-repo";
import { getTemplateList } from "~/lib/github/get-template-list";
import { promptConfirmation } from "~/lib/prompts/confirmation";
import { promptGitInit } from "~/lib/prompts/git-init";
import { promptInstallPackages } from "~/lib/prompts/install-packages";
import { promptPackageManager } from "~/lib/prompts/package-manager";
import { promptProjectName } from "~/lib/prompts/project-name";
import { promptProjectType } from "~/lib/prompts/project-type";
import { cleanupTemplate } from "~/lib/system/cleanup-template";
import { getGitInfo } from "~/lib/system/git-info";
import { handleError } from "~/lib/system/handle-error";
import { initializeGitRepository } from "~/lib/system/initialize-repo";
import { installDependencies } from "~/lib/system/install-dependencies";
import { getPackageManagers } from "~/lib/system/package-managers";
import { rollback } from "~/lib/system/rollback";
import { sayGoodbye } from "~/lib/system/say-goodbye";
import { sayHello } from "~/lib/system/say-hello";
import type { PackageManager } from "~/types";

const spinner = ora();
let errorPath = "";

try {
  await sayHello();

  const projectName = await promptProjectName();
  const projectPath = path.resolve(process.cwd(), projectName);
  errorPath = projectPath;

  spinner.start("Getting local git information");
  const gitInfo = await getGitInfo();
  spinner.succeed();

  spinner.start("Sorting local package managers");
  const packageManagers = await getPackageManagers();
  spinner.succeed();

  spinner.start("Fetching template list from GitHub");
  const templateList = await getTemplateList();
  spinner.succeed();

  const projectType = await promptProjectType(templateList);
  const installPackages = await promptInstallPackages();

  let packageManager: PackageManager = "npm";
  if (installPackages) {
    packageManager = await promptPackageManager(packageManagers);
  }

  let gitInit = false;
  if (gitInfo) {
    gitInit = await promptGitInit();
  }

  const confirm = await promptConfirmation(
    projectName,
    projectType,
    installPackages,
    packageManager,
    gitInit,
  );

  if (!confirm) {
    sayGoodbye();
    process.exit(0);
  }

  spinner.start(`Fetching ${projectType} template from GitHub`);
  await fetchRepo(projectType, projectName);
  spinner.succeed();

  spinner.start("Cleaning up template");
  await cleanupTemplate(projectName, projectPath, gitInit, gitInfo);
  spinner.succeed();

  if (installPackages) {
    spinner.start(`Installing dependencies using ${packageManager}`);
    await installDependencies(projectName, packageManager);
    spinner.succeed();
  }

  if (gitInit) {
    spinner.start("Initializing git repository");
    await initializeGitRepository(projectPath);
    spinner.succeed();
  }

  sayGoodbye(projectPath);
} catch (error) {
  const [exitCode, message] = handleError(error);
  rollback(message, errorPath, spinner);
  process.exit(exitCode);
}
