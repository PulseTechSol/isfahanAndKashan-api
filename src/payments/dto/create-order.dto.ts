import {
  IsEmail,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsString()
  productSlug: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  priceAmount: number; // in cents
}

export class CreateOrderDto {
  @IsEmail()
  customerEmail: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  town?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  postCode?: string;

  @IsString()
  country: string;

  @IsString()
  phoneNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @Min(1)
  totalAmount: number; // in cents

  @IsOptional()
  @IsString()
  currency?: string;
}
