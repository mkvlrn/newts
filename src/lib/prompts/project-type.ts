import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";
import type { GithubRepoResponse } from "~/types.js";

export function promptProjectType(templateList: GithubRepoResponse[]) {
  return prompts.select({
    message: colorette.dim(colorette.yellow("Project type")),
    choices: templateList.map((template) => ({
      name: `${template.name.split("-").pop() ?? "Unknown"} (${template.description})`,
      value: template.name,
    })),
  });
}
