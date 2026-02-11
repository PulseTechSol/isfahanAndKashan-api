import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /** Serves admin sidebar theme CSS so AdminJS assets can load it */
  @Get('admin-sidebar-theme.css')
  getAdminSidebarTheme(@Res() res: Response) {
    const file = path.join(process.cwd(), 'public', 'admin-sidebar-theme.css');
    res.type('text/css').sendFile(file, (err) => {
      if (err) res.status(404).end();
    });
  }

  /** Serves red logo for admin login page */
  @Get('logo-red.svg')
  getLogoRed(@Res() res: Response) {
    const file = path.join(process.cwd(), 'public', 'logo-red.svg');
    res.type('image/svg+xml').sendFile(file, (err) => {
      if (err) res.status(404).end();
    });
  }
}
