import { type ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import { type RmOptions } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import { exec } from "~/lib/system/exec.js";

export async function cleanupTemplate(
  projectName: string,
  projectPath: string,
  gitInit: boolean,
  gitInfo: string | null,
): Promise<void> {
  try {
    // remove extraneous files
    const rmOpt: RmOptions = { force: true };
    await rm(path.resolve(projectPath, ".github", "dependabot.yml"), rmOpt);
    await rm(path.resolve(projectPath, ".github", "workflows", "sonar.yml"), rmOpt);
    await rm(path.resolve(projectPath, "LICENSE"), rmOpt);
    await rm(path.resolve(projectPath, "readme.md"), rmOpt);
    await rm(path.resolve(projectPath, "package-lock.json"), rmOpt);
    await rm(path.resolve(projectPath, "yarn.lock"), rmOpt);
    await rm(path.resolve(projectPath, "pnpm-lock.yaml"), rmOpt);

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
