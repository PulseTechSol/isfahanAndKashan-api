import * as fs from 'fs';
import * as path from 'path';

/**
 * Pre-builds dist/.adminjs/bundle.js.
 * ADMIN_JS_TMP_DIR must be set before AdminJS module loads (see top of file).
 */
async function main(): Promise<void> {
  const buildBundlePath = path.join(process.cwd(), 'dist', '.adminjs', 'bundle.js');
  const buildBundleDir = path.dirname(buildBundlePath);

  // Always bundle during build — ignore runtime skip flag from Railway env
  delete process.env.ADMIN_JS_SKIP_BUNDLE;
  process.env.NODE_ENV = 'production';
  process.env.ADMIN_JS_TMP_DIR = buildBundleDir;
  fs.mkdirSync(buildBundleDir, { recursive: true });

  const jsxDir = path.join(process.cwd(), 'dist', 'admin', 'components');
  if (!fs.existsSync(jsxDir)) {
    throw new Error(
      `AdminJS JSX components missing at ${jsxDir}. Check nest-cli.json assets config.`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { buildAdminJsBundle } = require('./build-admin-bundle') as typeof import('./build-admin-bundle');
  await buildAdminJsBundle();

  // AdminJS may write to a legacy path — normalize to dist/.adminjs/bundle.js
  const legacyPath = path.join(process.cwd(), '.adminjs', 'bundle.js');
  if (!fs.existsSync(buildBundlePath) && fs.existsSync(legacyPath)) {
    fs.copyFileSync(legacyPath, buildBundlePath);
  }

  if (!fs.existsSync(buildBundlePath)) {
    throw new Error(`AdminJS bundle was not created at ${buildBundlePath}`);
  }

  console.log(
    `AdminJS: components bundle written to ${buildBundlePath} (${fs.statSync(buildBundlePath).size} bytes)`,
  );
}

main().catch((error: unknown) => {
  console.error('AdminJS bundle build failed:', error);
  process.exit(1);
});
