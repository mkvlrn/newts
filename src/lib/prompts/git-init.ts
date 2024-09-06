import { select } from "@inquirer/prompts";
import { dim, yellow } from "colorette";

export async function promptGitInit() {
  return select({
    message: dim(yellow("Initialize git and create first commit ?")),
    choices: [
      { value: true, name: "Yes" },
      { value: false, name: "No" },
    ],
  });
}
