export interface GithubRepoResponse {
  name: string;
  // biome-ignore lint/style/useNamingConvention: just obeying github api format
  full_name: string;
  description: string;
  // biome-ignore lint/style/useNamingConvention: just obeying github api format
  is_template: boolean;
}

export const packageManagers = ["npm", "yarn", "pnpm", "bun"] as const;
export type PackageManager = (typeof packageManagers)[number];
