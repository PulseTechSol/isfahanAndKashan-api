import AdminJS from 'adminjs';
import { bundleAdminComponents } from './admin-js-components';

/** Builds AdminJS custom-components bundle to ADMIN_JS_TMP_DIR/bundle.js */
export async function buildAdminJsBundle(): Promise<void> {
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
