import { buildAdminJsBundle } from './build-admin-bundle';

buildAdminJsBundle()
  .then(() => {
    console.log(
      'AdminJS: components bundle written to dist/.adminjs/bundle.js',
    );
  })
  .catch((error: unknown) => {
    console.error('AdminJS bundle build failed:', error);
    process.exit(1);
  });
