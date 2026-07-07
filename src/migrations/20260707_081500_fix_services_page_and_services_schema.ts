import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services_page_locales"
      ADD COLUMN IF NOT EXISTS "breadcrumbs_title" character varying,
      ADD COLUMN IF NOT EXISTS "intro" character varying,
      ADD COLUMN IF NOT EXISTS "capabilities_title" character varying,
      ADD COLUMN IF NOT EXISTS "capabilities_description" character varying,
      ADD COLUMN IF NOT EXISTS "cta_label" character varying,
      ADD COLUMN IF NOT EXISTS "transported_description" character varying,
      ADD COLUMN IF NOT EXISTS "meta_title" character varying,
      ADD COLUMN IF NOT EXISTS "meta_description" character varying
  `)

  await db.execute(sql`
    ALTER TABLE "services"
      ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "services_sort_order_idx"
      ON "services" ("sort_order")
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "services_sort_order_idx"
  `)

  await db.execute(sql`
    ALTER TABLE "services"
      DROP COLUMN IF EXISTS "sort_order"
  `)

  await db.execute(sql`
    ALTER TABLE "services_page_locales"
      DROP COLUMN IF EXISTS "breadcrumbs_title",
      DROP COLUMN IF EXISTS "intro",
      DROP COLUMN IF EXISTS "capabilities_title",
      DROP COLUMN IF EXISTS "capabilities_description",
      DROP COLUMN IF EXISTS "cta_label",
      DROP COLUMN IF EXISTS "transported_description",
      DROP COLUMN IF EXISTS "meta_title",
      DROP COLUMN IF EXISTS "meta_description"
  `)
}
