import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop()
  stripePaymentIntentId?: string;

  @Prop()
  stripeChargeId?: string;

  @Prop()
  orderId?: Types.ObjectId;

  @Prop()
  orderNumber?: string;

  @Prop()
  stripeCustomerId?: string;

  @Prop({ default: 'pending' })
  status: string; // pending, succeeded, failed, refunded

  @Prop()
  amount?: number; // in cents

  @Prop()
  currency?: string;

  @Prop()
  stripeEventId?: string; // idempotency
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ stripePaymentIntentId: 1 });
PaymentSchema.index({ stripeEventId: 1 }, { unique: true, sparse: true });
PaymentSchema.index({ orderId: 1 });
