import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Validation builds use NEXT_DIST_DIR=.next-preview, so they never touch the
  // `.next` folder served by the production service.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Project notes live outside the repository; don't let `next dev` write AGENTS.md/CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
