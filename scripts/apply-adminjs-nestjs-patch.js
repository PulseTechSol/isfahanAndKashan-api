const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '../node_modules/@adminjs/nestjs/build/admin.module.js',
);

if (!fs.existsSync(target)) {
  process.exit(0);
}

let source = fs.readFileSync(target, 'utf8');

if (source.includes('ADMIN_JS_SKIP_BUNDLE')) {
  process.exit(0);
}

source = source.replace(
  'onModuleInit() {',
  'async onModuleInit() {',
);

source = source.replace(
  'const admin = new adminjs_1.default(adminJSOptions);\n        const { httpAdapter } = this.httpAdapterHost;',
  `const admin = new adminjs_1.default(adminJSOptions);
        if (process.env.NODE_ENV === 'production' && process.env.ADMIN_JS_SKIP_BUNDLE !== 'true') {
            const fs = require('fs');
            const path = require('path');
            const tmpDir = process.env.ADMIN_JS_TMP_DIR || '.adminjs';
            const bundleDir = path.isAbsolute(tmpDir) ? tmpDir : path.join(process.cwd(), tmpDir);
            const bundlePath = path.join(bundleDir, 'bundle.js');
            if (!fs.existsSync(bundlePath)) {
                await admin.initialize();
            }
        }
        const { httpAdapter } = this.httpAdapterHost;`,
);

fs.writeFileSync(target, source);
console.log('Applied AdminJS NestJS runtime patch');
