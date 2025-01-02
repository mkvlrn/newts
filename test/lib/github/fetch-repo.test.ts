import { readFile, readdir, rm } from "node:fs/promises";
import type { AddressInfo } from "node:net";
import { chdir } from "node:process";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { fetchRepo } from "~/lib/github/fetch-repo";
import { getTestServer } from "./test-server.js";

const { server, startServer, closeServer } = getTestServer("repo");

let baseUrl: string;

beforeEach(async () => {
  chdir("test");
  await startServer();
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://localhost:${port}`;
});

afterEach(async () => {
  await rm("test-project", { recursive: true, force: true });
  chdir("..");
  await closeServer();
});

describe("fetchRepo", () => {
  test("should fetch a repo", async () => {
    await fetchRepo(baseUrl, "test-template", "test-project");

    const projectDirectory = await readdir("test-project");
    const fileContents = await readFile("test-project/test.txt");

    expect(projectDirectory).toEqual(["test.txt"]);
    expect(fileContents.toString()).toEqual("test");
  });

  test("should throw on incorrect template name", async () => {
    const act = fetchRepo(baseUrl, "yolo", "test-project");

    await expect(act).rejects.toThrow("failed to fetch template (bad url)");
  });
});
