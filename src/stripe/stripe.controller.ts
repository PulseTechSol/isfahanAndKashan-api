import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { PaymentsService } from '../payments/payments.service';

@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() dto: CreatePaymentIntentDto) {
    const order = await this.paymentsService.findOrderById(dto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status !== 'pending') {
      throw new BadRequestException(
        `Order cannot be paid (status: ${order.status})`,
      );
    }
    // Reuse existing PaymentIntent if order already has one that is still confirmable (avoids duplicates from double-mount / double-click)
    if (order.stripePaymentIntentId) {
      const existing = await this.stripeService.getPaymentIntentIfConfirmable(
        order.stripePaymentIntentId,
      );
      if (existing?.client_secret) {
        this.logger.log(
          `[create-payment-intent] Reusing existing PaymentIntent ${existing.id} for order ${order._id.toString()}`,
        );
        return { clientSecret: existing.client_secret };
      }
    }
    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount: dto.amount,
      currency: 'gbp',
      metadata: { orderId: order._id.toString() },
    });
    await this.paymentsService.updateOrderPaymentIntentId(
      order._id,
      paymentIntent.id,
    );
    return { clientSecret: paymentIntent.client_secret };
  }

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
    @Req() req: { rawBody?: Buffer; body?: unknown },
  ) {
    this.logger.log('[Webhook] Step 1: Request received');

    if (!signature) {
      this.logger.warn('[Webhook] Step 2: Missing stripe-signature header');
      throw new BadRequestException('Missing stripe-signature header');
    }
    this.logger.log('[Webhook] Step 2: Signature header present');

    const rawBody =
      req.rawBody ??
      (req.body && Buffer.isBuffer(req.body) ? (req.body as Buffer) : undefined);
    if (!rawBody || !Buffer.isBuffer(rawBody)) {
      this.logger.warn('[Webhook] Step 3: No raw body (must be unparsed Buffer)');
      throw new BadRequestException(
        'Raw body is required for webhook verification. Ensure bodyParser.raw is used for this route.',
      );
    }
    this.logger.log(
      `[Webhook] Step 3: Raw body received, size=${rawBody.length} bytes`,
    );

    let event;
    try {
      event = this.stripeService.constructWebhookEvent(rawBody, signature);
      this.logger.log(
        `[Webhook] Step 4: Signature verified, event.id=${event.id}, event.type=${event.type}`,
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(
        `[Webhook] Step 4: Signature verification failed: ${message}`,
      );
      this.logger.error(
        '[Webhook] Fix: STRIPE_WEBHOOK_SECRET must be the Signing secret for the EXACT endpoint receiving this request. If using ngrok, use the secret from the Dashboard endpoint with your ngrok URL. If using Stripe CLI (stripe listen), use the whsec_... the CLI printed.',
      );
      throw new BadRequestException(
        `Webhook signature verification failed: ${message}`,
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        this.logger.log(
          '[Webhook] Step 5: Handling checkout.session.completed',
        );
        const session = event.data.object;
        await this.handleCheckoutCompleted(session);
        break;
      }
      case 'payment_intent.succeeded': {
        this.logger.log('[Webhook] Step 5: Handling payment_intent.succeeded');
        const paymentIntent = event.data.object;
        this.logger.log(
          `[Webhook] payment_intent.succeeded: id=${paymentIntent.id}, metadata=${JSON.stringify(paymentIntent.metadata)}`,
        );
        await this.handlePaymentIntentSucceeded(paymentIntent, event.id);
        break;
      }
      case 'payment_intent.payment_failed': {
        this.logger.log(
          '[Webhook] Step 5: Handling payment_intent.payment_failed',
        );
        const paymentIntent = event.data.object;
        await this.handlePaymentIntentFailed(paymentIntent, event.id);
        break;
      }
      default:
        this.logger.log(
          `[Webhook] Step 5: Unhandled event type: ${event.type}`,
        );
        break;
    }

    this.logger.log('[Webhook] Step 6: Done, returning 200');
    return { received: true };
  }

  private async handleCheckoutCompleted(
    session: import('stripe').Stripe.Checkout.Session,
  ) {
    this.logger.log(
      `[Webhook] handleCheckoutCompleted: sessionId=${session.id}`,
    );
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
    this.logger.log(
      `[Webhook] handleCheckoutCompleted: existingOrder=${!!existingOrder}`,
    );

    if (existingOrder) {
      this.logger.log(
        '[Webhook] handleCheckoutCompleted: updating existing order to paid',
      );
      await this.paymentsService.updateOrderBySessionId(session.id, {
        status: 'paid',
        totalAmount: session.amount_total ?? undefined,
        currency: session.currency || 'usd',
      });
      this.logger.log('[Webhook] handleCheckoutCompleted: order updated');
    } else {
      this.logger.log('[Webhook] handleCheckoutCompleted: creating new order');
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
      this.logger.log('[Webhook] handleCheckoutCompleted: new order created');
    }
    this.logger.log('[Webhook] handleCheckoutCompleted: done');
  }

  private async handlePaymentIntentSucceeded(
    paymentIntent: {
      id: string;
      amount?: number;
      currency?: string;
      metadata?: Record<string, string>;
    },
    eventId: string,
  ) {
    this.logger.log(
      `[Webhook] handlePaymentIntentSucceeded: eventId=${eventId}, piId=${paymentIntent.id}`,
    );

    const existing = await this.paymentsService.findPaymentByEventId(eventId);
    if (existing) {
      this.logger.log(
        `[Webhook] handlePaymentIntentSucceeded: event ${eventId} already processed, skipping`,
      );
      return;
    }
    this.logger.log(
      '[Webhook] handlePaymentIntentSucceeded: checking for duplicate - none found',
    );

    // Find order: by metadata first, then stripePaymentIntentId
    let orderId: string | undefined =
      paymentIntent.metadata?.orderId ?? undefined;
    this.logger.log(
      `[Webhook] handlePaymentIntentSucceeded: metadata.orderId=${orderId ?? 'undefined'}`,
    );

    if (!orderId) {
      this.logger.log(
        '[Webhook] handlePaymentIntentSucceeded: looking up order by stripePaymentIntentId',
      );
      const order = await this.paymentsService.findOrderByPaymentIntentId(
        paymentIntent.id,
      );
      orderId = order?._id?.toString();
      this.logger.log(
        `[Webhook] handlePaymentIntentSucceeded: order from DB=${orderId ?? 'not found'}`,
      );
    }

    if (orderId) {
      this.logger.log(
        `[Webhook] handlePaymentIntentSucceeded: updating order ${orderId} to paid`,
      );
      await this.paymentsService.updateOrderStatus(orderId, 'paid');
      this.logger.log(
        `[Webhook] handlePaymentIntentSucceeded: Order ${orderId} marked as paid`,
      );
    } else {
      this.logger.warn(
        `[Webhook] handlePaymentIntentSucceeded: no order found for PaymentIntent ${paymentIntent.id}`,
      );
    }

    this.logger.log(
      '[Webhook] handlePaymentIntentSucceeded: creating Payment record',
    );
    await this.paymentsService.createPayment({
      stripePaymentIntentId: paymentIntent.id,
      stripeEventId: eventId,
      orderId: orderId ? new Types.ObjectId(orderId) : undefined,
      status: 'succeeded',
      amount: paymentIntent.amount,
      currency: paymentIntent.currency || 'gbp',
    });
    this.logger.log('[Webhook] handlePaymentIntentSucceeded: done');
  }

  private async handlePaymentIntentFailed(
    paymentIntent: { id: string },
    eventId: string,
  ) {
    this.logger.log(
      `[Webhook] handlePaymentIntentFailed: piId=${paymentIntent.id}, eventId=${eventId}`,
    );
    const existing = await this.paymentsService.findPaymentByEventId(eventId);
    if (existing) {
      this.logger.log(
        '[Webhook] handlePaymentIntentFailed: already processed, skipping',
      );
      return;
    }
    this.logger.log(
      '[Webhook] handlePaymentIntentFailed: creating failed Payment record',
    );
    await this.paymentsService.createPayment({
      stripePaymentIntentId: paymentIntent.id,
      stripeEventId: eventId,
      status: 'failed',
    });
    this.logger.log('[Webhook] handlePaymentIntentFailed: done');
  }
}
