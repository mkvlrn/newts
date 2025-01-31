#!/usr/bin/env node
import * as github from "#lib/github.ts";
import * as prompts from "#lib/prompts.ts";
import * as system from "#lib/system.ts";
import type { PackageManager } from "#types.ts";
import fs from "node:fs/promises";
import path from "node:path";
import ora from "ora";

const spinner = ora();
let errorPath = "";
const pkgPath = path.resolve(import.meta.dirname, "../package.json");
const pkgFile = await fs.readFile(pkgPath, "utf8");
const { name, version } = JSON.parse(pkgFile) as { name: string; version: string };

try {
  system.sayHello(name, version);

  const projectName = await prompts.projectName();
  const projectPath = path.resolve(process.cwd(), projectName);
  errorPath = projectPath;

  spinner.start("Getting local git information");
  const gitInfo = await system.getGitInfo();
  spinner.succeed();

  spinner.start("Sorting local package managers");
  const packageManagers = await system.getPackageManagers();
  spinner.succeed();

  spinner.start("Fetching template list from GitHub");
  const templateList = await github.getTemplateList();
  spinner.succeed();

  const projectType = await prompts.projectType(templateList);
  const installPackages = await prompts.installPackages();

  let packageManager: PackageManager = "npm";
  if (installPackages) {
    packageManager = await prompts.packageManager(packageManagers);
  }

  let gitInit = false;
  if (gitInfo) {
    gitInit = await prompts.gitInit();
  }

  const confirm = await prompts.confirmation(
    projectName,
    projectType,
    installPackages,
    packageManager,
    gitInit,
  );

  if (!confirm) {
    system.sayGoodbye();
    process.exit(0);
  }

  spinner.start(`Fetching ${projectType} template from GitHub`);
  await github.fetchRepo(projectType, projectName);
  spinner.succeed();

  spinner.start("Cleaning up template");
  await system.cleanupTemplate(projectName, projectPath, gitInit, gitInfo);
  spinner.succeed();

  if (installPackages) {
    spinner.start(`Installing dependencies using ${packageManager}`);
    await system.installDependencies(projectName, packageManager);
    spinner.succeed();
  }

  if (gitInit) {
    spinner.start("Initializing git repository");
    await system.initializeGitRepository(projectPath);
    spinner.succeed();
  }

  system.sayGoodbye(projectPath);
} catch (error) {
  console.error((error as Error).message);
  const [exitCode, message] = system.handleError(error);
  system.rollback(message, errorPath, spinner);
  process.exit(exitCode);
}
