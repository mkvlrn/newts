import { select } from "@inquirer/prompts";
import { dim, yellow } from "colorette";
import type { GithubRepoResponse } from "~/types.js";

export function promptProjectType(templateList: GithubRepoResponse[]) {
  return select({
    message: dim(yellow("Project type")),
    choices: templateList.map((template) => ({
      name: `${template.name.split("-").pop() ?? "Unknown"} (${template.description})`,
      value: template.name,
    })),
  });
}
