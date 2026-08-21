import * as fs from 'fs';
import * as path from 'path';

/**
 * Runs before AdminJS is imported (via `node -r ./dist/admin/admin-env.js`).
 * Forces bundle output into dist/.adminjs so it ships with the Nest build artifact.
 */
if (process.env.NODE_ENV === 'production') {
  process.env.ADMIN_JS_TMP_DIR = path.join(process.cwd(), 'dist', '.adminjs');
  fs.mkdirSync(process.env.ADMIN_JS_TMP_DIR, { recursive: true });
}
