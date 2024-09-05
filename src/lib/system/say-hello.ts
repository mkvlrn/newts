import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chalk } from "~/lib/misc/chalk.js";

export async function sayHello(): Promise<void> {
  const packageDirectory = path.resolve(
    path.dirname(fileURLToPath(new URL(import.meta.url))),
  );
  const packageJsonPath = path.resolve(packageDirectory, "../../../package.json");
  const packageJsonFile = await readFile(packageJsonPath, "utf8");
  const packageJsonContents = JSON.parse(packageJsonFile) as {
    name: string;
    version: string;
  };
  const thisProject = chalk.cyanBright.bold(packageJsonContents.name);
  const version = chalk.greenBright.bold(packageJsonContents.version);

  // eslint-disable-next-line no-console
  console.info(`🤖 ${thisProject} v${version}`);
}
