import { prepareAdminJsBundle } from './prepare-admin';

async function main(): Promise<void> {
  await prepareAdminJsBundle();
  // Load Nest app only after AdminJS bundle path is configured (avoids loading adminjs too early).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { bootstrapApp } = require('./bootstrap-app') as typeof import('./bootstrap-app');
  await bootstrapApp();
}

main().catch((error: unknown) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
