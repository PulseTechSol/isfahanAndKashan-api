import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  orderId: string;

  @IsNumber()
  @Min(50)
  amount: number; // in pence/cents
}
