import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

/** Bundle produced during `npm run build` */
export function getBuildAdminJsBundlePath(): string {
  return path.join(process.cwd(), 'dist', '.adminjs', 'bundle.js');
}

/** Writable runtime dir — AdminJS reads ADMIN_JS_TMP_DIR when its module loads */
export function getRuntimeAdminJsBundleDir(): string {
  return path.join(os.tmpdir(), 'adminjs');
}

export function getRuntimeAdminJsBundlePath(): string {
  return path.join(getRuntimeAdminJsBundleDir(), 'bundle.js');
}

/** @deprecated use getRuntimeAdminJsBundlePath */
export function getAdminJsBundleDir(): string {
  return getRuntimeAdminJsBundleDir();
}

/** @deprecated use getRuntimeAdminJsBundlePath */
export function getAdminJsBundlePath(): string {
  return getRuntimeAdminJsBundlePath();
}

export function findAdminJsBundlePath(): string | undefined {
  const candidates = [
    getRuntimeAdminJsBundlePath(),
    getBuildAdminJsBundlePath(),
    path.join(process.cwd(), '.adminjs', 'bundle.js'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

/**
 * Copy a built/existing bundle into the runtime dir and point AdminJS at it.
 * Must run before the adminjs package is imported.
 */
export function deployAdminJsBundleToRuntime(): string {
  const runtimeDir = getRuntimeAdminJsBundleDir();
  const runtimePath = getRuntimeAdminJsBundlePath();
  fs.mkdirSync(runtimeDir, { recursive: true });

  const source = findAdminJsBundlePath();
  if (!source) {
    throw new Error(
      `AdminJS bundle not found. Expected ${getBuildAdminJsBundlePath()}`,
    );
  }

  if (path.resolve(source) !== path.resolve(runtimePath)) {
    fs.copyFileSync(source, runtimePath);
  }

  process.env.ADMIN_JS_TMP_DIR = runtimeDir;
  return runtimePath;
}

export function syncAdminJsBundleMirror(): void {
  const bundlePath = findAdminJsBundlePath();
  if (!bundlePath) {
    return;
  }

  const legacyDir = path.join(process.cwd(), '.adminjs');
  fs.mkdirSync(legacyDir, { recursive: true });
  fs.copyFileSync(bundlePath, path.join(legacyDir, 'bundle.js'));
}

/** Preload hook: set runtime dir before adminjs module loads. */
export function configureAdminJsEnv(): void {
  const runtimeDir = getRuntimeAdminJsBundleDir();
  fs.mkdirSync(runtimeDir, { recursive: true });
  process.env.ADMIN_JS_TMP_DIR = runtimeDir;
}

if (process.env.NODE_ENV === 'production') {
  configureAdminJsEnv();
}
