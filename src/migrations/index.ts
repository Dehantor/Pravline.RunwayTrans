import * as migration_20260707_060124 from './20260707_060124';

export const migrations = [
  {
    up: migration_20260707_060124.up,
    down: migration_20260707_060124.down,
    name: '20260707_060124'
  },
];
