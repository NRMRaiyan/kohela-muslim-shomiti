import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __dbClient: ReturnType<typeof postgres> | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // We throw lazily (on first query) rather than at import time so that
  // pages which don't touch the DB (and `next build`) don't crash when
  // the env var hasn't been configured yet.
  console.warn(
    "DATABASE_URL is not set. Add it to your .env.local (see README.md)."
  );
}

const client =
  global.__dbClient ??
  postgres(connectionString ?? "postgres://placeholder", {
    prepare: false,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = client;
}

export const db = drizzle(client, { schema });
