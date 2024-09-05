import { ExitPromptError } from "@inquirer/core";

export function handleError(error: unknown): [number, string] {
  let exitCode = 1;
  let message = (error as Error).message;

  if (error instanceof ExitPromptError) {
    exitCode = 0;
    message = "👋 Goodbye (process interrupted by user)";
  }

  return [exitCode, message];
}
