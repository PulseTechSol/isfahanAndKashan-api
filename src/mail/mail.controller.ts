import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * GET /mail/test?to=optional@email.com
   * Sends a test email to verify SMTP config. If no ?to=, uses ADMIN_ORDER_EMAIL.
   */
  @Get('test')
  async testEmail(
    @Query('to') to?: string,
  ): Promise<{ ok: boolean; message: string }> {
    return this.mailService.sendTestEmail(to);
  }
}
