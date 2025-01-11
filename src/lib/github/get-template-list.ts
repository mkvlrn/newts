import type { GithubRepoResponse } from "~/types";

export async function getTemplateList(): Promise<GithubRepoResponse[]> {
  const url = "https://api.github.com/users/mkvlrn/repos?type=public";

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("bad url");
    }
    const repos = (await response.json()) as GithubRepoResponse[];

    return repos.filter((repo) => repo.is_template);
  } catch (error) {
    throw new Error(
      `failed to fetch template list (${(error as Error).message})`,
    );
  }
}
