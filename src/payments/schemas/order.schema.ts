import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
export class OrderItem {
  @Prop()
  productId?: Types.ObjectId;

  @Prop()
  productSlug?: string;

  @Prop()
  productName?: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  priceAmount?: number; // in cents

  @Prop()
  stripePriceId?: string;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop()
  stripeCheckoutSessionId?: string;

  @Prop()
  stripePaymentIntentId?: string;

  @Prop()
  stripeSubscriptionId?: string;

  @Prop()
  customerId?: Types.ObjectId;

  @Prop()
  stripeCustomerId?: string;

  @Prop()
  customerEmail?: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: 'pending' })
  status: string; // pending, paid, failed, refunded, cancelled

  @Prop()
  totalAmount?: number; // in cents

  @Prop()
  currency?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ stripeCheckoutSessionId: 1 });
OrderSchema.index({ stripeCustomerId: 1 });
OrderSchema.index({ customerId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
