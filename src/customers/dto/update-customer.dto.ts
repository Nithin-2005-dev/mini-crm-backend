import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    example: 'Acme Corp Updated',
    description: 'Updated customer name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'updated@acme.com',
    description: 'Updated customer email',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '8888888888',
    description: 'Updated customer phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Acme Ltd',
    description: 'Updated company name',
  })
  @IsString()
  @IsOptional()
  company?: string;
}
