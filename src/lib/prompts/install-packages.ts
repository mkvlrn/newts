import { select } from "@inquirer/prompts";
import { dim, yellow } from "colorette";

export function promptInstallPackages() {
  return select({
    message: dim(yellow("Install packages?")),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
