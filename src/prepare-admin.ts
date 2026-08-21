import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import {
  deployAdminJsBundleToRuntime,
  findAdminJsBundlePath,
  getBuildAdminJsBundlePath,
  getRuntimeAdminJsBundleDir,
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

  const buildBundlePath = getBuildAdminJsBundlePath();
  const runtimeDir = getRuntimeAdminJsBundleDir();

  if (
    process.env.ADMIN_JS_SKIP_BUNDLE === 'true' &&
    findAdminJsBundlePath()
  ) {
    const deployed = deployAdminJsBundleToRuntime();
    console.log(`AdminJS: using pre-built bundle (${deployed})`);
    syncAdminJsBundleMirror();
    return;
  }

  if (!fs.existsSync(buildBundlePath)) {
    console.log('AdminJS: building components bundle at startup...');
    fs.mkdirSync(path.dirname(buildBundlePath), { recursive: true });

    try {
      execSync('node dist/admin/bundle-admin-components.js', {
        stdio: 'inherit',
        env: {
          ...process.env,
          NODE_ENV: 'production',
          ADMIN_JS_TMP_DIR: path.dirname(buildBundlePath),
        },
      });
    } catch (error) {
      throw new Error(
        `AdminJS bundle build failed. Ensure "npm run build" completed successfully. ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const deployed = deployAdminJsBundleToRuntime();
  syncAdminJsBundleMirror();
  console.log(
    `AdminJS: bundle ready at ${deployed} (${fs.statSync(deployed).size} bytes)`,
  );
}
