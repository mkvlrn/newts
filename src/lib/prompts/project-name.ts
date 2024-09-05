import { access } from "node:fs/promises";
import { input } from "@inquirer/prompts";
import { chalk } from "~/lib/misc/chalk.js";

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
