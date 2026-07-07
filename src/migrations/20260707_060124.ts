import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Baseline migration for databases that were previously managed with Payload push.
  await db.execute(sql`
    DO $$
    BEGIN
      IF to_regclass('public.payload_migrations') IS NOT NULL THEN
        DELETE FROM "payload_migrations" WHERE "batch" = -1;
      END IF;
    END $$;
  `)
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // Baseline migration intentionally has no rollback.
}
