import { select } from "@inquirer/prompts";
import { chalk } from "~/lib/misc/chalk.js";

export async function promptGitInit() {
  return select({
    message: chalk.dim.yellow("Initialize git and create first commit ?"),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
