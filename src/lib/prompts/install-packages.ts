import { select } from "@inquirer/prompts";
import { chalk } from "~/lib/misc/chalk.js";

export function promptInstallPackages() {
  return select({
    message: chalk.dim.yellow("Install packages?"),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
