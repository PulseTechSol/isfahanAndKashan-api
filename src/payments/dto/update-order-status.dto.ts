import { IsIn, IsString } from 'class-validator';

const ALLOWED_STATUSES = [
  'pending',
  'paid',
  'shipped',
  'rejected',
  'failed',
  'refunded',
  'cancelled',
] as const;

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(ALLOWED_STATUSES)
  status: string;
}

export const ORDER_STATUSES = [...ALLOWED_STATUSES];
