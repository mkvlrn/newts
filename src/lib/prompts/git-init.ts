import { select } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";

export async function promptGitInit() {
  return select({
    message: chalk.dim.yellow("Initialize git and create first commit ?"),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
