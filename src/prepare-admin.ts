import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Ensures AdminJS component bundle exists BEFORE Nest/AdminJS modules load.
 * Bundling runs in a subprocess so component IDs are not registered twice.
 */
export async function prepareAdminJsBundle(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const bundleDir = path.join(process.cwd(), 'dist', '.adminjs');
  const bundlePath = path.join(bundleDir, 'bundle.js');
  fs.mkdirSync(bundleDir, { recursive: true });
  process.env.ADMIN_JS_TMP_DIR = bundleDir;

  const skipIfExists =
    process.env.ADMIN_JS_SKIP_BUNDLE === 'true' && fs.existsSync(bundlePath);

  if (skipIfExists) {
    console.log(`AdminJS: using pre-built bundle (${bundlePath})`);
    return;
  }

  if (fs.existsSync(bundlePath)) {
    console.log(`AdminJS: using existing bundle (${bundlePath})`);
    return;
  }

  console.log('AdminJS: building components bundle at startup...');
  execSync('node dist/admin/bundle-admin-components.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      ADMIN_JS_TMP_DIR: bundleDir,
    },
  });

  if (!fs.existsSync(bundlePath)) {
    throw new Error(`AdminJS bundle was not created at ${bundlePath}`);
  }

  console.log(`AdminJS: bundle ready (${bundlePath})`);
}
