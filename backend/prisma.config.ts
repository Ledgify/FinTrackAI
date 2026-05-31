import { readFileSync } from "node:fs";
import { defineConfig } from "prisma/config";

function getDatabaseUrl(): string {
  try {
    const env = readFileSync(".env", "utf-8");
    const match = env.match(/^DATABASE_URL="?(.+?)"?$/m);
    if (match) return match[1];
  } catch {}
  return "postgresql://localhost:5432/fintrack";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl(),
  },
});
