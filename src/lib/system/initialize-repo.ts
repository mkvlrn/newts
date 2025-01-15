import type { ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import * as system from "~/lib/system/exec";

export async function initializeGitRepository(projectPath: string): Promise<void> {
  try {
    const execOpt: ExecSyncOptionsWithBufferEncoding = {
      stdio: "ignore",
      cwd: projectPath,
    };
    await system.exec("git init", execOpt);
    await system.exec("git add .", execOpt);
    await system.exec('git commit -m "chore: initial commit"', execOpt);
    await system.exec("npm run prepare", execOpt);
  } catch (error) {
    throw new Error(`failed to initiate git repository (${(error as Error).message})`);
  }
}
