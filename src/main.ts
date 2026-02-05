import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
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

  // Skip body parsing for /admin - AdminJS uses formidable and throws if body is pre-parsed
  const skipForAdmin =
    (middleware: express.RequestHandler) =>
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (req.path.startsWith('/admin')) return next();
      return middleware(req, res, next);
    };
  app.use(skipForAdmin(express.json()));
  app.use(skipForAdmin(express.urlencoded({ extended: true })));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT ?? 3001;
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      `http://localhost:${port}`,
      'http://127.0.0.1:' + port,
    ],
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
