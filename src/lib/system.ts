import { ExitPromptError } from "@inquirer/core";
import * as colorette from "colorette";
import type { ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import childProcess from "node:child_process";
import type { RmOptions } from "node:fs";
import { rmSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import type { Ora } from "ora";
import { type PackageManager, packageManagers } from "~/types";

const exec = promisify(childProcess.exec);

export function sayHello(name: string, version: string): void {
  const thisProject = colorette.bold(colorette.cyanBright(name));
  const versionInColor = colorette.bold(colorette.greenBright(version));

  console.info(`🤖 ${thisProject} v${versionInColor}`);
}

export function sayGoodbye(projectPath: string | false | null = null): void {
  if (projectPath === null) {
    console.info(colorette.cyanBright("👋 Goodbye!"));
    return;
  }

  if (projectPath === false) {
    console.info(colorette.cyanBright("👋 Goodbye. 😞"));
    return;
  }

  console.info(
    colorette.cyanBright(`🚀 Your project is ready at ${colorette.yellowBright(projectPath)}`),
  );
}

export function rollback(message: string, projectPath: string, spinner: Ora) {
  try {
    if (projectPath !== "") {
      spinner.start("Rolling back changes");
      rmSync(projectPath, { recursive: true, force: true });
      spinner.succeed();
    }
  } catch {
    const fullMessage = `${message}\nFailed to roll back changes, remove ${projectPath} manually`;
    spinner.fail(fullMessage);
  } finally {
    sayGoodbye(false);
  }
}

export async function getPackageManagers(): Promise<PackageManager[]> {
  const availablePackageManagers: PackageManager[] = [];

  try {
    for (const pm of packageManagers) {
      try {
        const execOpt: ExecSyncOptionsWithBufferEncoding = {
          stdio: "ignore",
        };
        await exec(`${pm} --version`, execOpt);
        availablePackageManagers.push(pm);
      } catch {
        // do nothing
      }
    }
    if (availablePackageManagers.length === 0) {
      throw new Error("no available package managers found");
    }
  } catch (error) {
    throw new Error(`failed to check for available package managers (${(error as Error).message})`);
  }

  return availablePackageManagers;
}

export async function installDependencies(
  projectPath: string,
  packageManager: string,
): Promise<void> {
  try {
    const execOpt: ExecSyncOptionsWithBufferEncoding = {
      stdio: "ignore",
      cwd: projectPath,
    };
    await exec(`${packageManager} install`, execOpt);
  } catch (error) {
    throw new Error(`failed to install dependencies (${(error as Error).message})`);
  }
}

export async function initializeGitRepository(projectPath: string): Promise<void> {
  try {
    const execOpt: ExecSyncOptionsWithBufferEncoding = {
      stdio: "ignore",
      cwd: projectPath,
    };
    await exec("git init", execOpt);
    await exec("git add .", execOpt);
    await exec('git commit -m "chore: initial commit"', execOpt);
    await exec("npm run prepare", execOpt);
  } catch (error) {
    throw new Error(`failed to initialize git repository (${(error as Error).message})`);
  }
}

export function handleError(error: unknown): [number, string] {
  let exitCode = 1;
  let message = (error as Error).message;

  if (error instanceof ExitPromptError) {
    exitCode = 0;
    message = "👋 Goodbye (process interrupted by user)";
  }

  return [exitCode, message];
}

export async function getGitInfo(): Promise<string | null> {
  try {
    await exec("git --version");

    const { stdout: outGitName } = await exec("git config user.name");
    const { stdout: outGitEmail } = await exec("git config user.email");

    const gitName = outGitName.trim();
    const gitEmail = outGitEmail.trim();

    return gitName && gitEmail ? `${gitName} <${gitEmail}>` : "";
  } catch {
    return null;
  }
}

export async function cleanupTemplate(
  projectName: string,
  projectPath: string,
  gitInit: boolean,
  gitInfo: string | null,
): Promise<void> {
  try {
    // remove extraneous files
    const rmOpt: RmOptions = { force: true };
    await fs.rm(path.resolve(projectPath, ".github", "dependabot.yml"), rmOpt);
    await fs.rm(path.resolve(projectPath, ".github", "workflows", "sonar.yml"), rmOpt);
    await fs.rm(path.resolve(projectPath, "LICENSE"), rmOpt);
    await fs.rm(path.resolve(projectPath, "readme.md"), rmOpt);
    await fs.rm(path.resolve(projectPath, "package-lock.json"), rmOpt);
    await fs.rm(path.resolve(projectPath, "yarn.lock"), rmOpt);
    await fs.rm(path.resolve(projectPath, "pnpm-lock.yaml"), rmOpt);

    // update package.json
    const execOpt: ExecSyncOptionsWithBufferEncoding = {
      stdio: "ignore",
      cwd: projectPath,
    };
    await exec(`npm pkg set name="${projectName}"`, execOpt);
    await exec(`npm pkg set description="${projectName}"`, execOpt);
    await (gitInit && gitInfo
      ? exec(`npm pkg set author="${gitInfo}"`, execOpt)
      : exec("npm pkg delete author", execOpt));
    await exec("npm pkg delete repository", execOpt);
    await exec("npm pkg delete keywords ", execOpt);
  } catch (error) {
    throw new Error(`failed to clean up template (${(error as Error).message})`);
  }
}
