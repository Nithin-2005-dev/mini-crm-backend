import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Follow up with client',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Call the client and discuss requirements',
    description: 'Optional task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'clx9abc123employeeid',
    description: 'User ID of the assigned EMPLOYEE',
  })
  @IsString()
  @IsNotEmpty()
  assignedToId: string;

  @ApiProperty({
    example: 'clx9xyz456customerid',
    description: 'Customer ID associated with the task',
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;
}
