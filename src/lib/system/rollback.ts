import fs from "node:fs";
import type { Ora } from "ora";

export function rollback(message: string, projectPath: string, spinner: Ora) {
  try {
    if (projectPath !== "") {
      spinner.start("Rolling back changes");
      fs.rmSync(projectPath, { recursive: true, force: true });
      spinner.succeed();
    }
  } catch {
    const fullMessage = `${message}\nFailed to roll back changes, remove ${projectPath} manually`;
    spinner.fail(fullMessage);
  }
}
