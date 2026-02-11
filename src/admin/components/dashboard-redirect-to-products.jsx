import React, { useEffect } from 'react';

/**
 * Replaces the default AdminJS dashboard. Redirects immediately to the Product list
 * so that after login users land on the catalog instead of the dashboard.
 */
const DashboardRedirectToProducts = () => {
  useEffect(() => {
    const rootPath = (typeof window !== 'undefined' && window.REDUX_STATE?.paths?.rootPath) || '/admin';
    window.location.replace(`${rootPath}/resources/Product`);
  }, []);

  return (
    <div style={{ padding: 24, textAlign: 'center', color: '#64748b' }}>
      Redirecting to products…
    </div>
  );
};

export default DashboardRedirectToProducts;
