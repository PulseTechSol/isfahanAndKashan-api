import AdminJS from 'adminjs';
import {
  ADMIN_COMPONENT_NAMES,
  resolveAdminComponentPath,
} from './admin-component-paths';

/**
 * Registers all custom AdminJS components in a stable order.
 * The order must stay consistent between build-time bundling and runtime.
 */
export function bundleAdminComponents() {
  const dashboardRedirectPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.dashboardRedirect,
  );
  const cloudinaryUrlUploadPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.cloudinaryUrlUpload,
  );
  const imageUrlShowPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.imageUrlShow,
  );
  const imageListCellPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.imageListCell,
  );
  const gbpAmountCellPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.gbpAmountCell,
  );
  const orderItemsShowPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.orderItemsShow,
  );
  const orderStatusListPath = resolveAdminComponentPath(
    ADMIN_COMPONENT_NAMES.orderStatusList,
  );

  return {
    dashboardComponent: AdminJS.bundle(dashboardRedirectPath),
    productMainImage: {
      edit: AdminJS.bundle(cloudinaryUrlUploadPath),
      show: AdminJS.bundle(imageUrlShowPath),
      list: AdminJS.bundle(imageListCellPath),
    },
    productImages: {
      edit: AdminJS.bundle(cloudinaryUrlUploadPath),
      show: AdminJS.bundle(imageUrlShowPath),
    },
    orderStatus: {
      list: AdminJS.bundle(orderStatusListPath),
      show: AdminJS.bundle(orderStatusListPath),
    },
    orderTotalAmount: {
      list: AdminJS.bundle(gbpAmountCellPath),
    },
    orderItems: {
      show: AdminJS.bundle(orderItemsShowPath),
    },
    paymentAmount: {
      list: AdminJS.bundle(gbpAmountCellPath),
      show: AdminJS.bundle(gbpAmountCellPath),
    },
  };
}
