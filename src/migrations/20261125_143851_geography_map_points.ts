import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_geography_page_map_points_kind" AS ENUM('office', 'repairBase', 'field');
  CREATE TABLE "geography_page_map_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_geography_page_map_points_kind" NOT NULL,
  	"latitude" numeric NOT NULL,
  	"longitude" numeric NOT NULL
  );
  
  CREATE TABLE "geography_page_map_points_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "geography_page_map_points" ADD CONSTRAINT "geography_page_map_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geography_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "geography_page_map_points_locales" ADD CONSTRAINT "geography_page_map_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geography_page_map_points"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "geography_page_map_points_order_idx" ON "geography_page_map_points" USING btree ("_order");
  CREATE INDEX "geography_page_map_points_parent_id_idx" ON "geography_page_map_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "geography_page_map_points_locales_locale_parent_id_unique" ON "geography_page_map_points_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "geography_page_map_points" CASCADE;
  DROP TABLE "geography_page_map_points_locales" CASCADE;
  DROP TYPE "public"."enum_geography_page_map_points_kind";`)
}
