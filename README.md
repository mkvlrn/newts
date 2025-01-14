# @mkvlrn/newts

This is a _very_ _VERY_ **VERY** opinionated CLI tool and set of templates for the setup of a few different TypeScript projects with a focus on code quality and consistency from the start.

It attempts to provide a minimalistic setup with modern tools and practices without bloat - but bloat means different things to different people, so your mileage may vary.

## usage

Usage is as follows: `npx --yes @mkvlrn/newts@latest`. The CLI is interactive.

The `--yes` flag is used to skip the npx confirmation prompt, and the `@latest` tag is used to ensure you are always getting the latest version of the tool.

## the templates

- [node](https://github.com/mkvlrn/template-node) - good starting point for anything node
- [nestjs](https://github.com/mkvlrn/template-nestjs) - nestjs starter done **right**
- [discord bot](https://github.com/mkvlrn/template-discordbot) - discord bot with `discord.js`
- [react with vite](https://github.com/mkvlrn/template-vite-react) - pretty much what [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) does for react, but with biome, vitest, etc.
- [nextjs](https://github.com/mkvlrn/template-next) - what [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) does for nextjs, but with biome, vitest, etc; you're seeing a theme here, right?

## requirements

- Node.js 20+ - don't use anything lower than that, node 22 is the current LTS, keep up
- npm 10+ (npx should be used to run the CLI tool, but you can pick any package manager you want for the project itself)
- A unix-like shell - if you're on Windows, you should use WSL2 or Git Bash

## tools and configurations

Each project will be an ESM (`type: module`) project with the following tools and configurations:

- [git](https://git-scm.com/) with a standard `.gitignore` file
- [biome](https://github.com/biomejs/biome) to lint and format the codebase either on demand or on commit (staged files only) - let eslint and prettier die, and lint-staged is also a casualty I guess
- [vitest](https://vitest.dev/) as a test runner, because Jest is _terrible_
- [husky](https://github.com/typicode/husky) to run the lint-staged commands on pre-commit hooks
- [commitlint](https://commitlint.js.org/) to enforce conventional commit messages
- [tsx](https://github.com/privatenumber/tsx) as a TypeScript dev runner
- [swc](https://github.com/swc-project/swc) as a TypeScript compiler and/or dev runner (for the nest template only)

## another cli, huh?

Each available CLI out there brings some opinions and tools that might not be what you want or need, and this one is no different. The main difference is that this one is _my_ opinion, and I'm sharing it with you.

Instead of using `create-vite`, `@nestjs/cli`, or `create-next-app` tools to initialize those projects, this CLI tool will do it from scratch, adding only the tools and configurations that I think are necessary for a good starting point (see above).

NestJs and Next.js have their own way of doing things, and both of them are okay, but I think they can be improved. Also they seem to be very resistant to moving to ESM, and that's a shame.

## no huge readme with exhaustive explanations

Just generate a project and see for yourself. If you have any questions, feel free to open an issue or a PR.

The defaults are opinionated, but very sane and easy to adapt to your needs.
