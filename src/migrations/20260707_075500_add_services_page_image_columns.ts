import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services_page_transported_items"
      ADD COLUMN IF NOT EXISTS "image_id" integer;

    CREATE INDEX IF NOT EXISTS "services_page_transported_items_image_idx"
      ON "services_page_transported_items" ("image_id");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'services_page_transported_items_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "services_page_transported_items"
          ADD CONSTRAINT "services_page_transported_items_image_id_media_id_fk"
          FOREIGN KEY ("image_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;

    ALTER TABLE "services_page_advantages_items"
      ADD COLUMN IF NOT EXISTS "image_id" integer;

    CREATE INDEX IF NOT EXISTS "services_page_advantages_items_image_idx"
      ON "services_page_advantages_items" ("image_id");

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'services_page_advantages_items_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "services_page_advantages_items"
          ADD CONSTRAINT "services_page_advantages_items_image_id_media_id_fk"
          FOREIGN KEY ("image_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "services_page_transported_items"
      DROP CONSTRAINT IF EXISTS "services_page_transported_items_image_id_media_id_fk";

    DROP INDEX IF EXISTS "services_page_transported_items_image_idx";

    ALTER TABLE "services_page_transported_items"
      DROP COLUMN IF EXISTS "image_id";

    ALTER TABLE "services_page_advantages_items"
      DROP CONSTRAINT IF EXISTS "services_page_advantages_items_image_id_media_id_fk";

    DROP INDEX IF EXISTS "services_page_advantages_items_image_idx";

    ALTER TABLE "services_page_advantages_items"
      DROP COLUMN IF EXISTS "image_id";
  `)
}
