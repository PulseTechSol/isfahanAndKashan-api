import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import {
  configureAdminJsEnv,
  ensureAdminJsBundleAtCanonicalPath,
  findAdminJsBundlePath,
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

  configureAdminJsEnv();
  const bundlePath = getAdminJsBundlePath();

  const skipIfExists =
    process.env.ADMIN_JS_SKIP_BUNDLE === 'true' && findAdminJsBundlePath();

  if (skipIfExists) {
    const resolved = ensureAdminJsBundleAtCanonicalPath();
    console.log(`AdminJS: using pre-built bundle (${resolved})`);
    syncAdminJsBundleMirror();
    return;
  }

  const existing = findAdminJsBundlePath();
  if (existing) {
    const resolved = ensureAdminJsBundleAtCanonicalPath();
    console.log(`AdminJS: using existing bundle (${resolved})`);
    syncAdminJsBundleMirror();
    return;
  }

  console.log('AdminJS: building components bundle at startup...');
  const bundleDir = path.dirname(bundlePath);

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

  const resolved = ensureAdminJsBundleAtCanonicalPath();
  syncAdminJsBundleMirror();
  console.log(`AdminJS: bundle ready (${resolved})`);
}
