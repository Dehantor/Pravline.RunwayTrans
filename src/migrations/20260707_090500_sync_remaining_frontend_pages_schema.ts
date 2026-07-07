import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contacts_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "map_embed_url" character varying NOT NULL DEFAULT 'https://www.openstreetmap.org/export/embed.html?bbox=92.856071%2C55.993209%2C92.906071%2C56.023209&layer=mapnik&marker=56.008209%2C92.881071',
      "requisites_image_id" integer,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    )
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contacts_page_locales" (
      "home_link_label" character varying NOT NULL DEFAULT 'Главная',
      "breadcrumbs_title" character varying NOT NULL DEFAULT 'Контакты',
      "page_title" character varying NOT NULL DEFAULT 'Контакты',
      "callback_title" character varying NOT NULL DEFAULT 'Заказать звонок',
      "phone_placeholder" character varying NOT NULL DEFAULT 'Ваш номер телефона',
      "consent_label" character varying NOT NULL DEFAULT 'Я согласен(а) на обработку персональных данных',
      "submit_label" character varying NOT NULL DEFAULT 'Перезвонить',
      "submitting_label" character varying NOT NULL DEFAULT 'Отправка...',
      "success_message" character varying NOT NULL DEFAULT 'Заявка успешно отправлена.',
      "error_message" character varying NOT NULL DEFAULT 'Произошла ошибка при отправке.',
      "map_title" character varying NOT NULL DEFAULT 'Карта офиса Runway Trans',
      "requisites_text" character varying DEFAULT 'Лицензия и реквизиты компании доступны по запросу.',
      "meta_title" character varying DEFAULT 'Контакты | Runway Trans',
      "meta_description" character varying DEFAULT 'Свяжитесь с Runway Trans: адрес, телефон, email и форма обратного звонка.',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    )
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contacts_page_locales_locale_parent_id_unique'
      ) THEN
        ALTER TABLE "contacts_page_locales"
          ADD CONSTRAINT "contacts_page_locales_locale_parent_id_unique"
          UNIQUE ("_locale", "_parent_id");
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contacts_page_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "contacts_page_locales"
          ADD CONSTRAINT "contacts_page_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "contacts_page"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contacts_page_contact_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" character varying PRIMARY KEY NOT NULL,
      "icon" character varying NOT NULL DEFAULT 'address',
      "label" character varying NOT NULL,
      "value" character varying NOT NULL,
      "href" character varying,
      "_locale" "_locales" NOT NULL
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "contacts_page_contact_items_order_idx"
      ON "contacts_page_contact_items" ("_order")
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "contacts_page_contact_items_parent_id_idx"
      ON "contacts_page_contact_items" ("_parent_id")
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "contacts_page_contact_items_locale_idx"
      ON "contacts_page_contact_items" ("_locale")
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contacts_page_contact_items_parent_id_fk'
      ) THEN
        ALTER TABLE "contacts_page_contact_items"
          ADD CONSTRAINT "contacts_page_contact_items_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "contacts_page"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'contacts_page_requisites_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "contacts_page"
          ADD CONSTRAINT "contacts_page_requisites_image_id_media_id_fk"
          FOREIGN KEY ("requisites_image_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "contacts_page_requisites_image_idx"
      ON "contacts_page" ("requisites_image_id")
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "history_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    )
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "history_page_locales" (
      "company_breadcrumb_label" character varying NOT NULL DEFAULT 'Компания',
      "breadcrumbs_title" character varying NOT NULL DEFAULT 'История',
      "page_title" character varying NOT NULL DEFAULT 'История',
      "meta_title" character varying DEFAULT 'История',
      "meta_description" character varying DEFAULT 'Ключевые этапы развития компании Runway Trans.',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    )
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'history_page_locales_locale_parent_id_unique'
      ) THEN
        ALTER TABLE "history_page_locales"
          ADD CONSTRAINT "history_page_locales_locale_parent_id_unique"
          UNIQUE ("_locale", "_parent_id");
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'history_page_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "history_page_locales"
          ADD CONSTRAINT "history_page_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "history_page"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "history_page_timeline" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" character varying PRIMARY KEY NOT NULL,
      "years" character varying NOT NULL,
      "title" character varying NOT NULL,
      "description" character varying NOT NULL,
      "tone" character varying NOT NULL DEFAULT 'green',
      "image_id" integer,
      "_locale" "_locales" NOT NULL
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "history_page_timeline_order_idx"
      ON "history_page_timeline" ("_order")
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "history_page_timeline_parent_id_idx"
      ON "history_page_timeline" ("_parent_id")
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "history_page_timeline_locale_idx"
      ON "history_page_timeline" ("_locale")
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "history_page_timeline_image_idx"
      ON "history_page_timeline" ("image_id")
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'history_page_timeline_parent_id_fk'
      ) THEN
        ALTER TABLE "history_page_timeline"
          ADD CONSTRAINT "history_page_timeline_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "history_page"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'history_page_timeline_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "history_page_timeline"
          ADD CONSTRAINT "history_page_timeline_image_id_media_id_fk"
          FOREIGN KEY ("image_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "reviews_page_video_reviews_locales" (
      "company_name" character varying NOT NULL,
      "reviewer" character varying NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" character varying NOT NULL
    )
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reviews_page_video_reviews_locales_locale_parent_id_unique'
      ) THEN
        ALTER TABLE "reviews_page_video_reviews_locales"
          ADD CONSTRAINT "reviews_page_video_reviews_locales_locale_parent_id_unique"
          UNIQUE ("_locale", "_parent_id");
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reviews_page_video_reviews_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "reviews_page_video_reviews_locales"
          ADD CONSTRAINT "reviews_page_video_reviews_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "reviews_page_video_reviews"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "reviews_page_text_reviews_locales" (
      "company_name" character varying NOT NULL,
      "reviewer" character varying NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" character varying NOT NULL
    )
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reviews_page_text_reviews_locales_locale_parent_id_unique'
      ) THEN
        ALTER TABLE "reviews_page_text_reviews_locales"
          ADD CONSTRAINT "reviews_page_text_reviews_locales_locale_parent_id_unique"
          UNIQUE ("_locale", "_parent_id");
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reviews_page_text_reviews_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "reviews_page_text_reviews_locales"
          ADD CONSTRAINT "reviews_page_text_reviews_locales_parent_id_fk"
          FOREIGN KEY ("_parent_id")
          REFERENCES "reviews_page_text_reviews"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    ALTER TABLE "reviews_page_locales"
      ADD COLUMN IF NOT EXISTS "hero_image_alt" character varying,
      ADD COLUMN IF NOT EXISTS "video_section_title" character varying,
      ADD COLUMN IF NOT EXISTS "documents_section_title" character varying,
      ADD COLUMN IF NOT EXISTS "documents_section_description" character varying
  `)

  await db.execute(sql`
    ALTER TABLE "reviews_page"
      ADD COLUMN IF NOT EXISTS "hero_image_id" integer
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "reviews_page_hero_image_idx"
      ON "reviews_page" ("hero_image_id")
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'reviews_page_hero_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "reviews_page"
          ADD CONSTRAINT "reviews_page_hero_image_id_media_id_fk"
          FOREIGN KEY ("hero_image_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    ALTER TABLE "runway_trans_today_page_locales"
      ADD COLUMN IF NOT EXISTS "company_breadcrumb_label" character varying,
      ADD COLUMN IF NOT EXISTS "video_section_title" character varying
  `)

  await db.execute(sql`
    ALTER TABLE "runway_trans_today_page"
      ADD COLUMN IF NOT EXISTS "video_poster_id" integer
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "runway_trans_today_page_video_poster_idx"
      ON "runway_trans_today_page" ("video_poster_id")
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'runway_trans_today_page_video_poster_id_media_id_fk'
      ) THEN
        ALTER TABLE "runway_trans_today_page"
          ADD CONSTRAINT "runway_trans_today_page_video_poster_id_media_id_fk"
          FOREIGN KEY ("video_poster_id")
          REFERENCES "media"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION;
      END IF;
    END $$;
  `)

  await db.execute(sql`
    ALTER TABLE "guide_page_locales"
      ADD COLUMN IF NOT EXISTS "company_breadcrumb_label" character varying,
      ADD COLUMN IF NOT EXISTS "intro_text" character varying,
      ADD COLUMN IF NOT EXISTS "people_title" character varying,
      ADD COLUMN IF NOT EXISTS "gallery_title" character varying
  `)

  await db.execute(sql`
    ALTER TABLE "vacancies"
      ADD COLUMN IF NOT EXISTS "contact_phone" character varying,
      ADD COLUMN IF NOT EXISTS "contact_email" character varying
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "vacancies"
      DROP COLUMN IF EXISTS "contact_phone",
      DROP COLUMN IF EXISTS "contact_email"
  `)

  await db.execute(sql`DROP TABLE IF EXISTS "reviews_page_text_reviews_locales" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "reviews_page_video_reviews_locales" CASCADE`)
  await db.execute(sql`
    ALTER TABLE "reviews_page_locales"
      DROP COLUMN IF EXISTS "hero_image_alt",
      DROP COLUMN IF EXISTS "video_section_title",
      DROP COLUMN IF EXISTS "documents_section_title",
      DROP COLUMN IF EXISTS "documents_section_description"
  `)
  await db.execute(sql`
    ALTER TABLE "reviews_page"
      DROP CONSTRAINT IF EXISTS "reviews_page_hero_image_id_media_id_fk"
  `)
  await db.execute(sql`DROP INDEX IF EXISTS "reviews_page_hero_image_idx"`)
  await db.execute(sql`
    ALTER TABLE "runway_trans_today_page"
      DROP CONSTRAINT IF EXISTS "runway_trans_today_page_video_poster_id_media_id_fk"
  `)
  await db.execute(sql`DROP INDEX IF EXISTS "runway_trans_today_page_video_poster_idx"`)
  await db.execute(sql`
    ALTER TABLE "runway_trans_today_page"
      DROP COLUMN IF EXISTS "video_poster_id"
  `)
  await db.execute(sql`
    ALTER TABLE "runway_trans_today_page_locales"
      DROP COLUMN IF EXISTS "company_breadcrumb_label",
      DROP COLUMN IF EXISTS "video_section_title"
  `)
  await db.execute(sql`
    ALTER TABLE "guide_page_locales"
      DROP COLUMN IF EXISTS "company_breadcrumb_label",
      DROP COLUMN IF EXISTS "intro_text",
      DROP COLUMN IF EXISTS "people_title",
      DROP COLUMN IF EXISTS "gallery_title"
  `)
  await db.execute(sql`
    ALTER TABLE "reviews_page"
      DROP COLUMN IF EXISTS "hero_image_id"
  `)
  await db.execute(sql`DROP TABLE IF EXISTS "history_page_timeline" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "history_page_locales" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "history_page" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "contacts_page_contact_items" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "contacts_page_locales" CASCADE`)
  await db.execute(sql`DROP TABLE IF EXISTS "contacts_page" CASCADE`)
}
