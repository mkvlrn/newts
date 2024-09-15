import * as system from "~/lib/system/exec.js";

export async function getGitInfo(): Promise<string | null> {
  try {
    await system.exec("git --version");

    const { stdout: outGitName } = await system.exec("git config user.name");
    const { stdout: outGitEmail } = await system.exec("git config user.email");

    const gitName = outGitName.trim();
    const gitEmail = outGitEmail.trim();

    return !gitName || !gitEmail ? "" : `${gitName} <${gitEmail}>`;
  } catch {
    return null;
  }
}
