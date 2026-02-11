import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsService implements OnModuleInit {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async onModuleInit() {
    await this.backfillPaymentOrderNumbers();
  }

  /** One-time backfill: set orderNumber on payments that have orderId but no orderNumber */
  async backfillPaymentOrderNumbers(): Promise<number> {
    const payments = await this.paymentModel
      .find({ orderId: { $exists: true, $ne: null }, $or: [{ orderNumber: { $exists: false } }, { orderNumber: '' }] })
      .lean()
      .exec();
    let updated = 0;
    for (const p of payments) {
      if (!p.orderId) continue;
      const order = await this.findOrderById(p.orderId);
      if (order?.orderNumber) {
        await this.paymentModel.updateOne({ _id: p._id }, { orderNumber: order.orderNumber }).exec();
        updated++;
      }
    }
    return updated;
  }

  async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.orderModel.countDocuments().exec();
    const seq = String(count + 1).padStart(5, '0');
    return `IK-${year}-${seq}`;
  }

  async createOrder(data: Partial<Order>): Promise<OrderDocument> {
    if (!data.orderNumber) {
      data.orderNumber = await this.generateOrderNumber();
    }
    const order = new this.orderModel(data);
    return order.save();
  }

  async findOrderByCheckoutSessionId(
    sessionId: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findOne({ stripeCheckoutSessionId: sessionId })
      .exec();
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
  }

  async updateOrderBySessionId(
    sessionId: string,
    updates: Partial<Order>,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findOneAndUpdate({ stripeCheckoutSessionId: sessionId }, updates, {
        new: true,
      })
      .exec();
  }

  async createPayment(data: Partial<Payment>): Promise<PaymentDocument> {
    if (data.orderId && !data.orderNumber) {
      const order = await this.findOrderById(data.orderId);
      if (order?.orderNumber) data.orderNumber = order.orderNumber;
    }
    const payment = new this.paymentModel(data);
    return payment.save();
  }

  async findPaymentByEventId(
    stripeEventId: string,
  ): Promise<PaymentDocument | null> {
    return this.paymentModel.findOne({ stripeEventId }).exec();
  }

  async findOrderById(
    id: string | Types.ObjectId,
  ): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }

  async findOrderByPaymentIntentId(
    stripePaymentIntentId: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ stripePaymentIntentId }).exec();
  }

  async updateOrderPaymentIntentId(
    orderId: string | Types.ObjectId,
    stripePaymentIntentId: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { stripePaymentIntentId }, { new: true })
      .exec();
  }

  async findOrderByOrderNumber(
    orderNumber: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel.findOne({ orderNumber }).exec();
  }
}
