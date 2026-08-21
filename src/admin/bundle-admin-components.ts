import { buildAdminJsBundle } from './build-admin-bundle';
import { syncAdminJsBundleMirror } from './admin-env';

buildAdminJsBundle()
  .then(() => {
    syncAdminJsBundleMirror();
    console.log(
      'AdminJS: components bundle written to dist/.adminjs/bundle.js',
    );
  })
  .catch((error: unknown) => {
    console.error('AdminJS bundle build failed:', error);
    process.exit(1);
  });
