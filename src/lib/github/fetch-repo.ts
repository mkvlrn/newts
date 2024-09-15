import fs from "node:fs/promises";
import path from "node:path";
import AdmZip from "adm-zip";

export async function fetchRepo(
  baseUrl: string,
  templateName: string,
  projectName: string,
): Promise<void> {
  try {
    const url = `${baseUrl}/repos/mkvlrn/${templateName}/zipball`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("bad url");
    }

    const buffer = await response.arrayBuffer();
    const zipPath = path.join(process.cwd(), `${projectName}.zip`);
    await fs.writeFile(zipPath, Buffer.from(buffer));

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(process.cwd(), true);
    const unzippedName = zip.getEntries()[0].rawEntryName;

    await fs.rename(unzippedName, projectName);
    await fs.unlink(zipPath);
  } catch (error) {
    throw new Error(`failed to fetch template (${(error as Error).message})`);
  }
}
