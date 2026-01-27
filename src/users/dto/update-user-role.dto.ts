import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserRoleDto {
  @ApiProperty({
    enum: Role,
    example: Role.EMPLOYEE,
    description: 'New role for the user',
  })
  @IsEnum(Role)
  role: Role;
}
