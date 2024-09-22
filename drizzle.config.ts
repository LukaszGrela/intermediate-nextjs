/* istanbul ignore file */
import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({
  path: ['.env.local', '.env.secret', '.env'],
})

export default {
  schema: './db/schema.ts',
  out: './migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
} satisfies Config
