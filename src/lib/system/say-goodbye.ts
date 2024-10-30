import * as colorette from "colorette";

export function sayGoodbye(projectPath: string | false | null = null): void {
  if (projectPath === null) {
    // eslint-disable-next-line no-console
    console.info(colorette.cyanBright("👋 Goodbye!"));
    return;
  }

  if (projectPath === false) {
    // eslint-disable-next-line no-console
    console.info(colorette.cyanBright("👋 Goodbye. 😞"));
    return;
  }

  // eslint-disable-next-line no-console
  console.info(
    colorette.cyanBright(`🚀 Your project is ready at ${colorette.yellowBright(projectPath)}`),
  );
}
