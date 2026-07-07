import * as migration_20260707_060124 from './20260707_060124';
import * as migration_20260707_075500_add_services_page_image_columns from './20260707_075500_add_services_page_image_columns';
import * as migration_20260707_081500_fix_services_page_and_services_schema from './20260707_081500_fix_services_page_and_services_schema';
import * as migration_20260707_083200_add_services_page_cta_href from './20260707_083200_add_services_page_cta_href';
import * as migration_20260707_090500_sync_remaining_frontend_pages_schema from './20260707_090500_sync_remaining_frontend_pages_schema';

export const migrations = [
  {
    up: migration_20260707_060124.up,
    down: migration_20260707_060124.down,
    name: '20260707_060124'
  },
  {
    up: migration_20260707_075500_add_services_page_image_columns.up,
    down: migration_20260707_075500_add_services_page_image_columns.down,
    name: '20260707_075500_add_services_page_image_columns'
  },
  {
    up: migration_20260707_081500_fix_services_page_and_services_schema.up,
    down: migration_20260707_081500_fix_services_page_and_services_schema.down,
    name: '20260707_081500_fix_services_page_and_services_schema'
  },
  {
    up: migration_20260707_083200_add_services_page_cta_href.up,
    down: migration_20260707_083200_add_services_page_cta_href.down,
    name: '20260707_083200_add_services_page_cta_href'
  },
  {
    up: migration_20260707_090500_sync_remaining_frontend_pages_schema.up,
    down: migration_20260707_090500_sync_remaining_frontend_pages_schema.down,
    name: '20260707_090500_sync_remaining_frontend_pages_schema'
  },
];
