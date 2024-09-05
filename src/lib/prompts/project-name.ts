import { access } from "node:fs/promises";
import { input } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";

export async function promptProjectName() {
  return input({
    message: chalk.dim.yellow("Project name"),
    default: "my-project",
    validate: async (projectName) => {
      const isValidFilename = /^[A-Za-z][\w.-]*$/g.test(projectName);
      if (!isValidFilename) {
        return "Please enter a valid directory name for your project.";
      }

      try {
        await access(projectName);
        return "A directory with this name already exists.";
      } catch {
        return true;
      }
    },
  });
}
