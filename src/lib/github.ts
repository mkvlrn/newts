import AdmZip from "adm-zip";
import fs from "node:fs/promises";
import path from "node:path";
import type { GithubRepoResponse } from "~/types";

export async function fetchRepo(templateName: string, projectName: string): Promise<void> {
  try {
    const url = `https://api.github.com/repos/mkvlrn/${templateName}/zipball`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("bad url");
    }

    const buffer = await response.arrayBuffer();
    const zipPath = path.join(process.cwd(), `${projectName}.zip`);
    await fs.writeFile(zipPath, Buffer.from(buffer));

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(process.cwd(), true);
    const zipEntries = zip.getEntries();
    if (zipEntries[0] === undefined) {
      throw new Error("no entries in template zip");
    }
    const unzippedName = zipEntries[0].rawEntryName;

    await fs.rename(unzippedName, projectName);
    await fs.unlink(zipPath);
  } catch (error) {
    throw new Error(`failed to fetch template (${(error as Error).message})`);
  }
}

export async function getTemplateList(): Promise<GithubRepoResponse[]> {
  const url = "https://api.github.com/users/mkvlrn/repos?type=public";

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("bad url");
    }
    const repos = (await response.json()) as GithubRepoResponse[];

    return repos.filter((repo) => repo.is_template);
  } catch (error) {
    throw new Error(`failed to fetch template list (${(error as Error).message})`);
  }
}
