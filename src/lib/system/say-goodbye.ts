import * as colorette from "colorette";

export function sayGoodbye(projectPath: string | false | null = null): void {
  if (projectPath === null) {
    console.info(colorette.cyanBright("👋 Goodbye!"));
    return;
  }

  if (projectPath === false) {
    console.info(colorette.cyanBright("👋 Goodbye. 😞"));
    return;
  }

  console.info(
    colorette.cyanBright(
      `🚀 Your project is ready at ${colorette.yellowBright(projectPath)}`,
    ),
  );
}
