import AdminJS from 'adminjs';
import { bundleAdminComponents } from './admin-js-components';

/**
 * Pre-builds .adminjs/bundle.js during `npm run build`.
 * Run with NODE_ENV=production so AdminJS writes the components bundle to disk.
 */
async function main(): Promise<void> {
  process.env.NODE_ENV = 'production';

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
  console.log('AdminJS: components bundle written to .adminjs/bundle.js');
}

main().catch((error: unknown) => {
  console.error('AdminJS bundle build failed:', error);
  process.exit(1);
});
