import { select } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";
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
