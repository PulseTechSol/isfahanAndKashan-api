import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async createOrder(data: Partial<Order>): Promise<OrderDocument> {
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
}
