import { select } from "@inquirer/prompts";
import { chalk } from "~/lib/misc/chalk.js";
import type { GithubRepoResponse } from "~/types.js";

export function promptProjectType(templateList: GithubRepoResponse[]) {
  return select({
    message: chalk.dim.yellow("Project type"),
    choices: templateList.map((template) => ({
      name: `${template.name.split("-").pop() ?? "Unknown"} (${template.description})`,
      value: template.name,
    })),
  });
}
