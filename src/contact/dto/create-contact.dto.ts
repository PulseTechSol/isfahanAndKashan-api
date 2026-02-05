import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @IsString()
  @MinLength(10, { message: 'Message must be at least 10 characters' })
  message: string;
}
