import * as migration_20260707_060124 from './20260707_060124';
import * as migration_20260707_075500_add_services_page_image_columns from './20260707_075500_add_services_page_image_columns';

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
];
