import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      images: {
        unoptimized: true,
      },
      basePath: "/portfoliowaniss",
      trailingSlash: true,
      env: { NEXT_PUBLIC_BASE_PATH: "/portfoliowaniss" },
    }
  : { env: { NEXT_PUBLIC_BASE_PATH: "" } };

export default nextConfig;
