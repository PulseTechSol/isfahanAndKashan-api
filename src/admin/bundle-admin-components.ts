import * as fs from 'fs';
import * as path from 'path';

/**
 * Pre-builds dist/.adminjs/bundle.js.
 * ADMIN_JS_TMP_DIR must be set before AdminJS module loads (see top of file).
 */
async function main(): Promise<void> {
  const bundleDir =
    process.env.ADMIN_JS_TMP_DIR ??
    path.join(process.cwd(), 'dist', '.adminjs');
  const absoluteBundleDir = path.isAbsolute(bundleDir)
    ? bundleDir
    : path.join(process.cwd(), bundleDir);

  process.env.NODE_ENV = 'production';
  process.env.ADMIN_JS_TMP_DIR = absoluteBundleDir;
  fs.mkdirSync(absoluteBundleDir, { recursive: true });

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { buildAdminJsBundle } = require('./build-admin-bundle') as typeof import('./build-admin-bundle');
  await buildAdminJsBundle();

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ensureAdminJsBundleAtCanonicalPath, syncAdminJsBundleMirror } =
    require('./admin-env') as typeof import('./admin-env');

  const bundlePath = ensureAdminJsBundleAtCanonicalPath();
  syncAdminJsBundleMirror();
  console.log(`AdminJS: components bundle written to ${bundlePath}`);
}

main().catch((error: unknown) => {
  console.error('AdminJS bundle build failed:', error);
  process.exit(1);
});
