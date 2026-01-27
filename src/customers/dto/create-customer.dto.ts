import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Acme Corp',
    description: 'Customer name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'contact@acme.com',
    description: 'Customer email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '9999999999',
    description: 'Customer phone number',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    example: 'Acme',
    description: 'Company name (optional)',
  })
  @IsString()
  @IsOptional()
  company?: string;
}
