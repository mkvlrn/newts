import { select } from "@inquirer/prompts";
// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";

export function promptInstallPackages() {
  return select({
    message: chalk.dim.yellow("Install packages?"),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
