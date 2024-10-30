import type { ExecSyncOptionsWithBufferEncoding } from "node:child_process";
import * as system from "~/lib/system/exec.js";
import { PackageManager, packageManagers } from "~/types.js";

export async function getPackageManagers(): Promise<PackageManager[]> {
  const availablePackageManagers: PackageManager[] = [];

  try {
    for (const pm of packageManagers) {
      try {
        const execOpt: ExecSyncOptionsWithBufferEncoding = {
          stdio: "ignore",
        };
        await system.exec(`${pm} --version`, execOpt);
        availablePackageManagers.push(pm);
      } catch {
        continue;
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
