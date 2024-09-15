export interface GithubRepoResponse {
  name: string;
  full_name: string;
  description: string;
  is_template: boolean;
}

export const packageManagers = ["npm", "yarn", "pnpm", "bun"] as const;
export type PackageManager = (typeof packageManagers)[number];
