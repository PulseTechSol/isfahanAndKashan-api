import * as fs from 'fs';
import * as path from 'path';

/** Absolute directory where AdminJS writes/reads components.bundle.js */
export function getAdminJsBundleDir(): string {
  const configured = process.env.ADMIN_JS_TMP_DIR;
  if (configured) {
    return path.isAbsolute(configured)
      ? configured
      : path.join(process.cwd(), configured);
  }
  return path.join(process.cwd(), 'dist', '.adminjs');
}

export function getAdminJsBundlePath(): string {
  return path.join(getAdminJsBundleDir(), 'bundle.js');
}

/** Possible bundle locations (build output vs legacy AdminJS default dir). */
export function findAdminJsBundlePath(): string | undefined {
  const candidates = [
    getAdminJsBundlePath(),
    path.join(process.cwd(), 'dist', '.adminjs', 'bundle.js'),
    path.join(process.cwd(), '.adminjs', 'bundle.js'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

/** Copy bundle to dist/.adminjs so production always serves a stable path. */
export function ensureAdminJsBundleAtCanonicalPath(): string {
  const canonicalPath = path.join(process.cwd(), 'dist', '.adminjs', 'bundle.js');
  const existing = findAdminJsBundlePath();

  if (existing && existing !== canonicalPath) {
    fs.mkdirSync(path.dirname(canonicalPath), { recursive: true });
    fs.copyFileSync(existing, canonicalPath);
  }

  if (!fs.existsSync(canonicalPath)) {
    throw new Error(`AdminJS bundle not found (expected ${canonicalPath})`);
  }

  process.env.ADMIN_JS_TMP_DIR = path.dirname(canonicalPath);
  return canonicalPath;
}

/** Keep legacy .adminjs path in sync for tools that still look there. */
export function syncAdminJsBundleMirror(): void {
  const bundlePath = findAdminJsBundlePath();
  if (!bundlePath) {
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
  const bundleDir = path.join(process.cwd(), 'dist', '.adminjs');
  fs.mkdirSync(bundleDir, { recursive: true });
  process.env.ADMIN_JS_TMP_DIR = bundleDir;
}

if (process.env.NODE_ENV === 'production') {
  configureAdminJsEnv();
}
