import type { ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import { exec } from "~/lib/system/exec.js";

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
