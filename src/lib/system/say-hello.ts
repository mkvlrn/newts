import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import * as colorette from "colorette";

export async function sayHello(): Promise<void> {
  const packageDirectory = path.resolve(path.dirname(url.fileURLToPath(new URL(import.meta.url))));
  const packageJsonPath = path.resolve(packageDirectory, "../../../package.json");
  const packageJsonFile = await fs.readFile(packageJsonPath, "utf8");
  const packageJsonContents = JSON.parse(packageJsonFile) as {
    name: string;
    version: string;
  };
  const thisProject = colorette.bold(colorette.cyanBright(packageJsonContents.name));
  const version = colorette.bold(colorette.greenBright(packageJsonContents.version));

  console.info(`🤖 ${thisProject} v${version}`);
}
