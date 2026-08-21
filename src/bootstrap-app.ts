import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from './app.module';

export async function bootstrapApp(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false, // We add parsers manually so webhook gets raw body, others get normal parsing
  });
  app.set('trust proxy', 1);

  // Stripe webhook needs raw body - must run before other parsers
  app.use(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    (
      req: express.Request & { rawBody?: Buffer },
      _res: express.Response,
      next: express.NextFunction,
    ) => {
      req.rawBody = req.body as Buffer;
      next();
    },
  );

  // Skip body parsing for /admin and /stripe/webhook (webhook needs raw body for signature verification)
  const skipForAdminAndWebhook =
    (middleware: express.RequestHandler) =>
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (req.path.startsWith('/admin')) return next();
      if (req.path === '/stripe/webhook') return next();
      return middleware(req, res, next);
    };
  app.use(skipForAdminAndWebhook(express.json()));
  app.use(skipForAdminAndWebhook(express.urlencoded({ extended: true })));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ?? 3001;
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      `http://localhost:${port}`,
      'http://127.0.0.1:' + port,
    ],
    credentials: true,
  });
  await app.listen(port);
}
