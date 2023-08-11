import Dexie from 'dexie';

export const db: any = new Dexie('hydroDB');
db.version(1).stores({
  entries: '++id, amount, icon, created_at',
  settings: '++id, key, value',
  presets: '++id, amount, icon',
});
