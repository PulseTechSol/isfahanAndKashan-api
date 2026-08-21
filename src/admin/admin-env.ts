import * as fs from 'fs';
import * as path from 'path';

/** Absolute directory where AdminJS writes/reads components.bundle.js */
export function getAdminJsBundleDir(): string {
  return path.join(process.cwd(), 'dist', '.adminjs');
}

export function getAdminJsBundlePath(): string {
  return path.join(getAdminJsBundleDir(), 'bundle.js');
}

/** Keep legacy .adminjs path in sync for tools that still look there. */
export function syncAdminJsBundleMirror(): void {
  const bundlePath = getAdminJsBundlePath();
  if (!fs.existsSync(bundlePath)) {
    return;
  }

  const legacyDir = path.join(process.cwd(), '.adminjs');
  fs.mkdirSync(legacyDir, { recursive: true });
  fs.copyFileSync(bundlePath, path.join(legacyDir, 'bundle.js'));
}

/**
 * Must run before AdminJS is imported (via `node -r ./dist/admin/admin-env.js`).
 */
export function configureAdminJsEnv(): void {
  const bundleDir = getAdminJsBundleDir();
  fs.mkdirSync(bundleDir, { recursive: true });
  process.env.ADMIN_JS_TMP_DIR = bundleDir;
}

if (process.env.NODE_ENV === 'production') {
  configureAdminJsEnv();
}
