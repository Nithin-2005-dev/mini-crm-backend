import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.gaurd';
import { RolesGuard } from '../common/guards/roles.gaurd';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'EMPLOYEE')
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'EMPLOYEE')
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }
}
