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
  @Prop({ unique: true })
  orderNumber?: string;

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

  /** Shipping / billing */
  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  address?: string;

  @Prop()
  town?: string;

  @Prop()
  state?: string;

  @Prop()
  postCode?: string;

  @Prop()
  country?: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  /** pending | paid | shipped | rejected | failed | refunded | cancelled */
  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  totalAmount?: number; // in cents

  @Prop()
  currency?: string;

  /** Set by Mongoose when timestamps: true */
  createdAt?: Date;
  updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ stripeCheckoutSessionId: 1 });
OrderSchema.index({ stripePaymentIntentId: 1 });
OrderSchema.index({ stripeCustomerId: 1 });
OrderSchema.index({ customerId: 1 });
OrderSchema.index({ customerEmail: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
