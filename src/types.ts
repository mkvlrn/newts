export interface GithubRepoResponse {
  name: string;
  full_name: string;
  description: string;
  is_template: boolean;
}

export type PackageManager = "npm" | "yarn" | "pnpm";
