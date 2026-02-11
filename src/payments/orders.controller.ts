import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const order = await this.paymentsService.createOrder({
      customerEmail: dto.customerEmail,
      firstName: dto.firstName,
      lastName: dto.lastName,
      address: dto.address,
      town: dto.town,
      state: dto.state,
      postCode: dto.postCode,
      country: dto.country,
      phoneNumber: dto.phoneNumber,
      items: dto.items.map((i) => ({
        productSlug: i.productSlug,
        productName: i.productName,
        productImage: i.productImage,
        quantity: i.quantity,
        priceAmount: i.priceAmount,
      })),
      totalAmount: dto.totalAmount,
      currency: dto.currency || 'gbp',
      status: 'pending',
    });
    return {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
    };
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    const order = await this.paymentsService.updateOrderStatus(id, dto.status);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return { status: order.status };
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const order = await this.paymentsService.findOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      status: order.status,
      customerEmail: order.customerEmail,
      firstName: order.firstName,
      lastName: order.lastName,
      address: order.address,
      town: order.town,
      state: order.state,
      postCode: order.postCode,
      country: order.country,
      phoneNumber: order.phoneNumber,
      items: order.items,
      totalAmount: order.totalAmount,
      currency: order.currency,
      createdAt: order.createdAt,
    };
  }
}
