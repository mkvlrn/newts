import { createServer } from "node:http";
import { promisify } from "node:util";
import AdmZip from "adm-zip";
import type { GithubRepoResponse } from "~/types.js";

const dummyZip = new AdmZip();
dummyZip.addFile("test-folder/", Buffer.alloc(0));
dummyZip.addFile("test-folder/test.txt", Buffer.from("test", "utf8"));

export function getTestServer(compareUrl: "repo" | "templates") {
  const urls = {
    repo: "/repos/mkvlrn/test-template/zipball",
    templates: "/users/mkvlrn/repos?type=public",
  };

  const server = createServer();
  server.on("request", (request, response) => {
    if (compareUrl === "repo" && request.url === urls[compareUrl]) {
      response
        .writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename='test.zip'",
          "Content-Length": dummyZip.toBuffer().length,
        })
        .end(dummyZip.toBuffer());
    } else if (compareUrl === "templates" && request.url === urls[compareUrl]) {
      response.writeHead(200, { "Content-Type": "application/json" }).end(
        JSON.stringify([
          {
            name: "test-template",
            description: "a test template",
            // biome-ignore lint/style/useNamingConvention: just obeying github api format
            full_name: "test template",
            // biome-ignore lint/style/useNamingConvention: just obeying github api format
            is_template: true,
          },
        ] as GithubRepoResponse[]),
      );
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" }).end("bad url");
    }
  });

  const startServer = promisify(server.listen.bind(server));
  const closeServer = promisify(server.close.bind(server));

  return { server, startServer, closeServer };
}
