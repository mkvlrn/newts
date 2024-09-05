// TODO: remove this when chalk mantainers decide to do esm the right way
// eslint-disable-next-line import/default
import chalk from "chalk";

export function sayGoodbye(projectPath: string | false | null = null): void {
  if (projectPath === null) {
    // eslint-disable-next-line no-console
    console.info(chalk.cyanBright("👋 Goodbye!"));
    return;
  }

  if (projectPath === false) {
    // eslint-disable-next-line no-console
    console.info(chalk.cyanBright("👋 Goodbye. 😞"));
    return;
  }

  // eslint-disable-next-line no-console
  console.info(
    chalk.cyanBright(`🚀 Your project is ready at ${chalk.yellowBright(projectPath)}`),
  );
}
