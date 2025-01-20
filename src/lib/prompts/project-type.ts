import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";
import type { GithubRepoResponse } from "~/types";

export function promptProjectType(templateList: GithubRepoResponse[]) {
  return prompts.select({
    pageSize: 10,
    loop: false,
    message: colorette.dim(colorette.yellow("Project type")),
    choices: templateList.map((template) => ({
      name: formatSelectName(template),
      value: template.name,
    })),
  });
}

function formatSelectName(template: GithubRepoResponse) {
  const updatedDaysAgo =
    (Date.now() - new Date(template.updated_at).getTime()) / (1000 * 60 * 60 * 24);

  let name = template.name.replace("template-", "");
  name += ` - ${template.description}`;
  name += `\n    updated ${updatedDaysAgo.toFixed(0)} days ago`;

  return name;
}
