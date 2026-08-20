import * as fs from 'fs';
import * as path from 'path';

export const ADMIN_COMPONENT_NAMES = {
  dashboardRedirect: 'dashboard-redirect-to-products',
  cloudinaryUrlUpload: 'cloudinary-url-upload',
  imageUrlShow: 'image-url-show',
  imageListCell: 'image-list-cell',
  gbpAmountCell: 'gbp-amount-cell',
  orderItemsShow: 'order-items-show',
  orderStatusList: 'order-status-list',
} as const;

/** Resolve JSX component paths for both dev (src) and production (dist) layouts. */
export function resolveAdminComponentPath(componentName: string): string {
  const baseName = componentName.replace(/\.jsx$/, '');
  const candidates = [
    path.join(__dirname, 'components', baseName),
    path.join(process.cwd(), 'dist/admin/components', baseName),
    path.join(process.cwd(), 'src/admin/components', baseName),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(`${candidate}.jsx`) || fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `AdminJS component "${componentName}" not found. Checked: ${candidates.join(', ')}`,
  );
}
