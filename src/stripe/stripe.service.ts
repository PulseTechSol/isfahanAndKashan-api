import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
import { PaymentsService } from '../payments/payments.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
  ) {
    const secret = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secret) {
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    this.stripe = new Stripe(secret);
  }

  async createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email, name });
  }

  async createCheckoutSession(params: {
    customerEmail: string;
    customerId?: string;
    lineItems: Array<{
      priceId: string;
      quantity: number;
      productSlug?: string;
      productName?: string;
    }>;
    successUrl: string;
    cancelUrl: string;
    mode?: 'payment' | 'subscription';
  }): Promise<Stripe.Checkout.Session> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || '';

    let customerId = params.customerId;
    if (!customerId) {
      const existingUser = await this.usersService.findByEmail(
        params.customerEmail,
      );
      if (existingUser?.stripeCustomerId) {
        customerId = existingUser.stripeCustomerId;
      } else {
        const customer = await this.createCustomer(params.customerEmail);
        customerId = customer.id;
      }
    }

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: params.mode || 'payment',
      line_items: params.lineItems.map((item) => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      success_url: params.successUrl || `${frontendUrl}/success`,
      cancel_url: params.cancelUrl || `${frontendUrl}/products`,
      metadata: {
        customerEmail: params.customerEmail,
        items: JSON.stringify(
          params.lineItems.map((i) => ({
            productSlug: i.productSlug,
            productName: i.productName,
          })),
        ),
      },
    });

    return session;
  }

  constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
  ): Stripe.Event {
    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is required');
    }
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  getStripe(): Stripe {
    return this.stripe;
  }

  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency,
      automatic_payment_methods: { enabled: true },
      metadata: params.metadata,
    });
    return paymentIntent;
  }

  /** Retrieve existing PaymentIntent; returns null if not found or not reusable */
  async getPaymentIntentIfConfirmable(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent | null> {
    const pi = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    const confirmable = [
      'requires_payment_method',
      'requires_confirmation',
    ].includes(pi.status);
    return confirmable ? pi : null;
  }
}
