import fs from "node:fs/promises";
import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";

export async function promptProjectName() {
  return prompts.input({
    message: colorette.dim(colorette.yellow("Project name")),
    default: "my-project",
    validate: async (projectName) => {
      const isValidFilename = /^[A-Za-z][\w.-]*$/g.test(projectName);
      if (!isValidFilename) {
        return "Please enter a valid directory name for your project.";
      }

      try {
        await fs.access(projectName);
        return "A directory with this name already exists.";
      } catch {
        return true;
      }
    },
  });
}
