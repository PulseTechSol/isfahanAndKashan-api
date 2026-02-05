import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { PaymentsService } from '../payments/payments.service';

@Controller('stripe')
export class StripeController {
  @Post('create-checkout-session')
  async createCheckoutSession(@Body() dto: CreateCheckoutDto) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || '';
    const session = await this.stripeService.createCheckoutSession({
      customerEmail: dto.customerEmail,
      lineItems: dto.lineItems.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity ?? 1,
        productSlug: item.productSlug,
        productName: item.productName,
      })),
      successUrl: dto.successUrl || `${frontendUrl}/success`,
      cancelUrl: dto.cancelUrl || `${frontendUrl}/products`,
      mode: dto.mode,
    });
    return { url: session.url, sessionId: session.id };
  }

  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private usersService: UsersService,
    private paymentsService: PaymentsService,
  ) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: { rawBody?: Buffer },
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestException(
        'Raw body is required for webhook verification. Ensure bodyParser.raw is used for this route.',
      );
    }

    let event;
    try {
      event = this.stripeService.constructWebhookEvent(rawBody, signature);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new BadRequestException(
        `Webhook signature verification failed: ${message}`,
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await this.handleCheckoutCompleted(session);
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await this.handlePaymentIntentSucceeded(paymentIntent, event.id);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        await this.handlePaymentIntentFailed(paymentIntent, event.id);
        break;
      }
      default:
        // Log unhandled events
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(
    session: import('stripe').Stripe.Checkout.Session,
  ) {
    const customerEmail =
      session.customer_details?.email ||
      session.customer_email ||
      session.metadata?.customerEmail;
    const customerName = session.customer_details?.name;
    const stripeCustomerId = session.customer
      ? typeof session.customer === 'string'
        ? session.customer
        : session.customer.id
      : undefined;

    if (customerEmail && stripeCustomerId) {
      await this.usersService.createOrUpdateByStripe(
        customerEmail,
        customerName ?? undefined,
        stripeCustomerId,
      );
    }

    const existingOrder =
      await this.paymentsService.findOrderByCheckoutSessionId(session.id);

    if (existingOrder) {
      await this.paymentsService.updateOrderBySessionId(session.id, {
        status: 'paid',
        totalAmount: session.amount_total ?? undefined,
        currency: session.currency || 'usd',
      });
    } else {
      const user = customerEmail
        ? await this.usersService.findByEmail(customerEmail)
        : null;

      let items: Array<{
        productSlug?: string;
        productName?: string;
        quantity: number;
        priceAmount?: number;
      }> = [];
      if (session.metadata?.items) {
        try {
          items = JSON.parse(session.metadata.items);
        } catch {
          // ignore
        }
      }

      await this.paymentsService.createOrder({
        stripeCheckoutSessionId: session.id,
        stripeCustomerId,
        customerId: user?._id,
        customerEmail: customerEmail || undefined,
        items: items.map((i) => ({
          productSlug: i.productSlug,
          productName: i.productName,
          quantity: i.quantity || 1,
          priceAmount:
            session.amount_total != null
              ? Math.round(session.amount_total / (items.length || 1))
              : undefined,
        })),
        status: 'paid',
        totalAmount: session.amount_total ?? undefined,
        currency: session.currency || 'usd',
      });
    }
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: { id: string; amount?: number; currency?: string },
    eventId: string,
  ) {
    const existing = await this.paymentsService.findPaymentByEventId(eventId);
    if (existing) return;

    await this.paymentsService.createPayment({
      stripePaymentIntentId: paymentIntent.id,
      stripeEventId: eventId,
      status: 'succeeded',
      amount: paymentIntent.amount,
      currency: paymentIntent.currency || 'usd',
    });
  }

  private async handlePaymentIntentFailed(
    paymentIntent: { id: string },
    eventId: string,
  ) {
    const existing = await this.paymentsService.findPaymentByEventId(eventId);
    if (existing) return;

    await this.paymentsService.createPayment({
      stripePaymentIntentId: paymentIntent.id,
      stripeEventId: eventId,
      status: 'failed',
    });
  }
}
