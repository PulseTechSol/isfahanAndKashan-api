import AdminJS from 'adminjs';
import { bundleAdminComponents } from './admin-js-components';

/**
 * Pre-builds dist/.adminjs/bundle.js during `npm run build`.
 * ADMIN_JS_TMP_DIR and NODE_ENV must be set in the shell before Node starts
 * so AdminJS reads the output path when its module loads.
 */
async function main(): Promise<void> {
  const components = bundleAdminComponents();

  const admin = new AdminJS({
    rootPath: '/admin',
    dashboard: {
      component: components.dashboardComponent,
      handler: async () => ({}),
    },
    resources: [],
  });

  await admin.initialize();
  console.log(
    'AdminJS: components bundle written to dist/.adminjs/bundle.js',
  );
}

main().catch((error: unknown) => {
  console.error('AdminJS bundle build failed:', error);
  process.exit(1);
});
