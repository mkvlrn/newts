import type { AddressInfo } from "node:net";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { getTemplateList } from "~/lib/github/get-template-list";
import { getTestServer } from "./test-server.js";

const { server, startServer, closeServer } = getTestServer("templates");

let baseUrl: string;

beforeEach(async () => {
  await startServer();
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://localhost:${port}`;
});

afterEach(async () => {
  await closeServer();
});

describe("getTemplateList", () => {
  test("should fetch template list", async () => {
    const response = await getTemplateList(
      `${baseUrl}/users/mkvlrn/repos?type=public`,
    );

    expect(response).toStrictEqual([
      {
        name: "test-template",
        description: "a test template",
        // biome-ignore lint/style/useNamingConvention: just obeying github api format
        full_name: "test template",
        // biome-ignore lint/style/useNamingConvention: just obeying github api format
        is_template: true,
      },
    ]);
  });

  test("should throw on bad url", async () => {
    const act = getTemplateList(`${baseUrl}/badurl`);

    await expect(act).rejects.toThrow(
      "failed to fetch template list (bad url)",
    );
  });
});
