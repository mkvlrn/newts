import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    conditions: ["default"],
  },

  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    watch: false,
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ["./src"],
      exclude: ["./src/**/*.test.{ts,tsx}", "./src/main.ts"],
    },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
