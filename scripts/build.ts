import child_process from "node:child_process";
import fs from "node:fs/promises";
import util from "node:util";
import swc from "@swc/core";
import tscAlias from "tsc-alias";

const out = "./dist";
const execAsync = util.promisify(child_process.exec);

// clean up old output
await fs.rm(out, { recursive: true, force: true });

// get all entry points
const files: string[] = [];
for await (const file of fs.glob("src/**/*.ts")) {
  files.push(file);
}

// transform files
await Promise.all(
  files.map(async (file) => {
    const { code } = await swc.transformFile(file, {
      jsc: {
        parser: {
          syntax: "typescript",
          decorators: true,
          dynamicImport: true,
        },
        target: "esnext",
        transform: {
          decoratorMetadata: true,
        },
      },
      module: {
        type: "es6",
        strict: true,
      },
    });

    const outputPath = `${out}/${file.replace(/^src\//, "").replace(/\.ts$/, ".js")}`;
    await fs.mkdir(outputPath.replace(/\/[^/]+$/, ""), { recursive: true });
    await fs.writeFile(outputPath, code);
  }),
);

// create full temp config because tsc-alias doesn't like extended configs
// https://github.com/justkey007/tsc-alias/issues/230
await execAsync("tsc --showConfig > tsconfig.temp.json");

// replace aliases with actual paths and add .js extensions
await tscAlias.replaceTscAliasPaths({
  outDir: out,
  resolveFullPaths: true,
  configFile: "tsconfig.temp.json",
});

// clean up temp config
await fs.rm("tsconfig.temp.json");
