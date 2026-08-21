import { execSync } from 'child_process';
import * as fs from 'fs';
import {
  getAdminJsBundleDir,
  getAdminJsBundlePath,
  syncAdminJsBundleMirror,
} from './admin/admin-env';

/**
 * Ensures AdminJS component bundle exists BEFORE Nest/AdminJS modules load.
 * Bundling runs in a subprocess so component IDs are not registered twice.
 */
export async function prepareAdminJsBundle(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const bundleDir = getAdminJsBundleDir();
  const bundlePath = getAdminJsBundlePath();
  process.env.ADMIN_JS_TMP_DIR = bundleDir;

  const skipIfExists =
    process.env.ADMIN_JS_SKIP_BUNDLE === 'true' && fs.existsSync(bundlePath);

  if (skipIfExists) {
    console.log(`AdminJS: using pre-built bundle (${bundlePath})`);
    syncAdminJsBundleMirror();
    return;
  }

  if (fs.existsSync(bundlePath)) {
    console.log(`AdminJS: using existing bundle (${bundlePath})`);
    syncAdminJsBundleMirror();
    return;
  }

  console.log('AdminJS: building components bundle at startup...');
  try {
    execSync('node dist/admin/bundle-admin-components.js', {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production',
        ADMIN_JS_TMP_DIR: bundleDir,
      },
    });
  } catch (error) {
    throw new Error(
      `AdminJS bundle build failed. Ensure "npm run build" completed successfully. ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!fs.existsSync(bundlePath)) {
    throw new Error(`AdminJS bundle was not created at ${bundlePath}`);
  }

  syncAdminJsBundleMirror();
  console.log(`AdminJS: bundle ready (${bundlePath})`);
}
