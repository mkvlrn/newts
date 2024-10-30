import * as prompts from "@inquirer/prompts";
import * as colorette from "colorette";

export async function promptGitInit() {
  const message = colorette.dim(colorette.yellow("Initialize git and create first commit ?"));

  return prompts.select({
    message,
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
