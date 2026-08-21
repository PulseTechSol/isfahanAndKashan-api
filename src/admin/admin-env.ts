import * as fs from 'fs';
import * as path from 'path';

/**
 * Must run before AdminJS is imported (via `node -r ./dist/admin/admin-env.js`).
 * Points ADMIN_JS_TMP_DIR at the pre-built bundle shipped inside dist/.
 */
const bundleDirs = [
  path.join(process.cwd(), 'dist', '.adminjs'),
  path.join(process.cwd(), '.adminjs'),
];

for (const dir of bundleDirs) {
  if (fs.existsSync(path.join(dir, 'bundle.js'))) {
    process.env.ADMIN_JS_TMP_DIR = dir;
    break;
  }
}
