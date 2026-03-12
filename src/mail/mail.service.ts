import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { OrderDocument } from '../payments/schemas/order.schema';

const BRAND = {
  name: 'Herati Rugs',
  maroon: '#6D1212',
  gold: '#E7BE88',
  cream: '#FDF4E3',
  website: 'https://heratirugs.com',
};

/** Format amount (stored in cents) to currency string */
function formatAmount(cents: number | undefined, currency = 'gbp'): string {
  if (cents == null) return '—';
  const value = cents / 100;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: (currency || 'gbp').toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Shared email wrapper */
function emailWrapper(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND.maroon} 0%, #8B1A1A 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin:0; color:${BRAND.gold}; font-size:26px; font-weight:600; letter-spacing:0.5px;">${BRAND.name}</h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.9); font-size:14px;">Handcrafted Persian Rugs</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 36px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:${BRAND.cream}; padding: 24px 40px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin:0; font-size:13px; color:#666;">
                <a href="${BRAND.website}" style="color:${BRAND.maroon}; text-decoration:none; font-weight:600;">${BRAND.website}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const user = this.configService.get<string>('MAILER_USER');
    const pass = this.configService.get<string>('MAILER_PASS');
    const admin = this.configService.get<string>('ADMIN_ORDER_EMAIL');
    this.logger.log(
      `[Mail] Startup: MAILER_USER=${user ? 'set' : 'NOT SET'}, MAILER_PASS=${pass ? 'set' : 'NOT SET'}, ADMIN_ORDER_EMAIL=${admin ?? 'NOT SET'}`,
    );
  }

  private getTransporter(): nodemailer.Transporter | null {
    const user = this.configService.get<string>('MAILER_USER');
    const pass = this.configService.get<string>('MAILER_PASS');
    this.logger.log(
      `[Mail] getTransporter: MAILER_USER=${user ? `${user.substring(0, 3)}...` : 'NOT SET'}, MAILER_PASS=${pass ? '***' : 'NOT SET'}`,
    );
    if (!user || !pass) {
      this.logger.warn(
        '[Mail] Mail not configured: set MAILER_USER and MAILER_PASS in .env',
      );
      return null;
    }
    this.logger.log('[Mail] Transporter created (Gmail)');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  /** Send "New order" notification to business (hello@heratirugs.com) */
  async sendNewOrderNotificationToAdmin(
    order: OrderDocument | { [key: string]: unknown },
  ): Promise<void> {
    const orderNumber = (order as OrderDocument).orderNumber ?? '—';
    this.logger.log(
      `[Mail] sendNewOrderNotificationToAdmin: starting for order ${orderNumber}`,
    );

    const adminEmail = this.configService.get<string>('ADMIN_ORDER_EMAIL');
    this.logger.log(`[Mail] ADMIN_ORDER_EMAIL=${adminEmail ?? 'NOT SET'}`);
    if (!adminEmail) {
      this.logger.warn(
        '[Mail] ADMIN_ORDER_EMAIL not set, skipping admin notification',
      );
      return;
    }
    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.warn('[Mail] No transporter, skipping admin email');
      return;
    }

    const _orderNumber = orderNumber;
    const customerEmail = (order as OrderDocument).customerEmail ?? '—';
    const firstName = (order as OrderDocument).firstName ?? '';
    const lastName = (order as OrderDocument).lastName ?? '';
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || '—';
    const phone = (order as OrderDocument).phoneNumber ?? '—';
    const address =
      [
        (order as OrderDocument).address,
        (order as OrderDocument).town,
        (order as OrderDocument).state,
        (order as OrderDocument).postCode,
        (order as OrderDocument).country,
      ]
        .filter(Boolean)
        .join(', ') || '—';
    const currency = (order as OrderDocument).currency ?? 'gbp';
    const totalAmount = (order as OrderDocument).totalAmount;
    const items = (order as OrderDocument).items ?? [];
    const createdAt =
      (order as OrderDocument).createdAt instanceof Date
        ? (order as OrderDocument).createdAt!.toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
        : '—';

    const rows = items
      .map(
        (item: {
          productName?: string;
          quantity?: number;
          priceAmount?: number;
        }) =>
          `<tr>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; color:#333;">${escapeHtml(item.productName ?? '—')}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; text-align:center;">${item.quantity ?? 0}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; text-align:right;">${formatAmount(item.priceAmount, currency)}</td>
          </tr>`,
      )
      .join('');

    const content = `
      <h2 style="margin:0 0 24px; color:${BRAND.maroon}; font-size:22px; font-weight:600;">New order received</h2>
      <p style="margin:0 0 24px; color:#444; font-size:15px; line-height:1.5;">You have received a new order. Details below.</p>

      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; background:${BRAND.cream}; border-radius:8px; overflow:hidden;">
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Order number</td><td style="padding:12px 16px;">${escapeHtml(orderNumber)}</td></tr>
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Date</td><td style="padding:12px 16px;">${createdAt}</td></tr>
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Customer</td><td style="padding:12px 16px;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Email</td><td style="padding:12px 16px;"><a href="mailto:${escapeHtml(String(customerEmail))}" style="color:${BRAND.maroon};">${escapeHtml(String(customerEmail))}</a></td></tr>
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Phone</td><td style="padding:12px 16px;">${escapeHtml(String(phone))}</td></tr>
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Shipping address</td><td style="padding:12px 16px;">${escapeHtml(address)}</td></tr>
      </table>

      <p style="margin:0 0 8px; font-weight:600; color:#333;">Order items</p>
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px;">
        <thead>
          <tr style="background:${BRAND.maroon}; color:white;">
            <th style="padding:12px 16px; text-align:left;">Item</th>
            <th style="padding:12px 16px; text-align:center;">Qty</th>
            <th style="padding:12px 16px; text-align:right;">Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="margin:0; font-size:18px; font-weight:700; color:${BRAND.maroon}; text-align:right;">Total: ${formatAmount(totalAmount, currency)}</p>
    `;

    const subject = `[${BRAND.name}] New order ${_orderNumber}`;
    this.logger.log(
      `[Mail] Sending admin email to=${adminEmail} subject="${subject}"`,
    );
    try {
      await transporter.sendMail({
        from: this.configService.get('MAILER_USER'),
        to: adminEmail,
        subject,
        html: emailWrapper(content, `New order ${_orderNumber}`),
      });
      this.logger.log(
        `[Mail] Admin order notification sent for order ${_orderNumber}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      this.logger.error(`[Mail] Failed to send admin order email: ${msg}`);
      if (stack) this.logger.error(`[Mail] Stack: ${stack}`);
      if (err && typeof err === 'object' && 'response' in err) {
        this.logger.error(
          `[Mail] SMTP response: ${JSON.stringify((err as { response?: string }).response)}`,
        );
      }
    }
  }

  /** Send order confirmation / receipt to customer with link to website */
  async sendOrderConfirmationToCustomer(
    order: OrderDocument | { [key: string]: unknown },
  ): Promise<void> {
    const orderNumber = (order as OrderDocument).orderNumber ?? '—';
    this.logger.log(
      `[Mail] sendOrderConfirmationToCustomer: starting for order ${orderNumber}`,
    );

    const customerEmail = (order as OrderDocument).customerEmail;
    if (!customerEmail) {
      this.logger.warn(
        '[Mail] Order has no customerEmail, skipping customer email',
      );
      return;
    }
    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.warn('[Mail] No transporter, skipping customer email');
      return;
    }

    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL')?.replace(/\/$/, '') ||
      BRAND.website;
    const orderId = (order as OrderDocument)._id?.toString();
    const firstName = (order as OrderDocument).firstName ?? '';
    const currency = (order as OrderDocument).currency ?? 'gbp';
    const totalAmount = (order as OrderDocument).totalAmount;
    const items = (order as OrderDocument).items ?? [];
    const receiptUrl = orderId
      ? `${frontendUrl}/orders/${orderId}`
      : frontendUrl;

    const rows = items
      .map(
        (item: {
          productName?: string;
          quantity?: number;
          priceAmount?: number;
        }) =>
          `<tr>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; color:#333;">${escapeHtml(item.productName ?? '—')}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; text-align:center;">${item.quantity ?? 0}</td>
            <td style="padding:12px 16px; border-bottom:1px solid #eee; text-align:right;">${formatAmount(item.priceAmount, currency)}</td>
          </tr>`,
      )
      .join('');

    const content = `
      <h2 style="margin:0 0 24px; color:${BRAND.maroon}; font-size:22px; font-weight:600;">Thank you for your order</h2>
      <p style="margin:0 0 24px; color:#444; font-size:15px; line-height:1.5;">Dear ${escapeHtml(firstName) || 'Customer'}, your order has been confirmed. We will prepare your handcrafted rug with care.</p>

      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; background:${BRAND.cream}; border-radius:8px; overflow:hidden;">
        <tr><td style="padding:12px 16px; font-weight:600; color:${BRAND.maroon};">Order number</td><td style="padding:12px 16px;">${escapeHtml(orderNumber)}</td></tr>
      </table>

      <p style="margin:0 0 8px; font-weight:600; color:#333;">Order summary</p>
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px;">
        <thead>
          <tr style="background:${BRAND.maroon}; color:white;">
            <th style="padding:12px 16px; text-align:left;">Item</th>
            <th style="padding:12px 16px; text-align:center;">Qty</th>
            <th style="padding:12px 16px; text-align:right;">Price</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="margin:0 0 24px; font-size:18px; font-weight:700; color:${BRAND.maroon}; text-align:right;">Total: ${formatAmount(totalAmount, currency)}</p>

      <p style="margin:0 0 16px; color:#444; font-size:15px;">View your order details and receipt online:</p>
      <p style="margin:0;">
        <a href="${receiptUrl}" style="display:inline-block; background:${BRAND.maroon}; color:white; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:600;">View order receipt</a>
      </p>
      <p style="margin:24px 0 0; font-size:14px; color:#666;">Or copy this link: <a href="${receiptUrl}" style="color:${BRAND.maroon};">${receiptUrl}</a></p>
    `;

    const subject = `Your order ${orderNumber} – ${BRAND.name}`;
    this.logger.log(
      `[Mail] Sending customer email to=${customerEmail} subject="${subject}"`,
    );
    try {
      await transporter.sendMail({
        from: this.configService.get('MAILER_USER'),
        to: customerEmail,
        subject,
        html: emailWrapper(content, `Order confirmation ${orderNumber}`),
      });
      this.logger.log(
        `[Mail] Order confirmation sent to customer for order ${orderNumber}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      this.logger.error(`[Mail] Failed to send customer order email: ${msg}`);
      if (stack) this.logger.error(`[Mail] Stack: ${stack}`);
      if (err && typeof err === 'object' && 'response' in err) {
        this.logger.error(
          `[Mail] SMTP response: ${JSON.stringify((err as { response?: string }).response)}`,
        );
      }
    }
  }

  /** Send a test email (for debugging). Returns { ok, message } or throws. */
  async sendTestEmail(to?: string): Promise<{ ok: boolean; message: string }> {
    const recipient = to || this.configService.get<string>('ADMIN_ORDER_EMAIL');
    this.logger.log(`[Mail] sendTestEmail: to=${recipient ?? 'NOT SET'}`);
    if (!recipient) {
      return {
        ok: false,
        message: 'No recipient. Set ADMIN_ORDER_EMAIL or pass ?to=email',
      };
    }
    const transporter = this.getTransporter();
    if (!transporter) {
      return {
        ok: false,
        message: 'Mail not configured (MAILER_USER/MAILER_PASS)',
      };
    }
    try {
      await transporter.sendMail({
        from: this.configService.get('MAILER_USER'),
        to: recipient,
        subject: `[${BRAND.name}] Test email`,
        html: emailWrapper(
          '<p>If you received this, order emails are configured correctly.</p>',
          'Test email',
        ),
      });
      this.logger.log(`[Mail] Test email sent to ${recipient}`);
      return { ok: true, message: `Test email sent to ${recipient}` };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Mail] sendTestEmail failed: ${msg}`);
      if (err instanceof Error && err.stack) {
        this.logger.error(`[Mail] Stack: ${err.stack}`);
      }
      return { ok: false, message: msg };
    }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
