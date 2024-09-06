import { cyanBright, yellowBright } from "colorette";

export function sayGoodbye(projectPath: string | false | null = null): void {
  if (projectPath === null) {
    // eslint-disable-next-line no-console
    console.info(cyanBright("👋 Goodbye!"));
    return;
  }

  if (projectPath === false) {
    // eslint-disable-next-line no-console
    console.info(cyanBright("👋 Goodbye. 😞"));
    return;
  }

  // eslint-disable-next-line no-console
  console.info(cyanBright(`🚀 Your project is ready at ${yellowBright(projectPath)}`));
}
