/** Builds AdminJS custom-components bundle to ADMIN_JS_TMP_DIR/bundle.js */
export async function buildAdminJsBundle(): Promise<void> {
  delete process.env.ADMIN_JS_SKIP_BUNDLE;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const AdminJS = require('adminjs').default as typeof import('adminjs').default;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { bundleAdminComponents } = require('./admin-js-components') as typeof import('./admin-js-components');

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
}
