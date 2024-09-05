import { type ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import { exec } from "~/lib/system/exec.js";

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
    throw new Error(`failed to initiate git repository (${(error as Error).message})`);
  }
}
