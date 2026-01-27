import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Customers')
@ApiBearerAuth('access-token')
@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  /**
   * Create customer (ADMIN only)
   */
  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a customer (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  /**
   * Get customers with pagination and search
   * ADMIN & EMPLOYEE
   */
  @Get()
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get customers with pagination and search' })
  @ApiResponse({ status: 200, description: 'Paginated customers returned' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of records per page (default: 10)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'acme',
    description: 'Search by name, email, phone, or company',
  })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    return this.customersService.findAll(
      Number(page),
      Number(limit),
      search,
    );
  }

  /**
   * Get customer by id
   * ADMIN & EMPLOYEE
   */
  @Get(':id')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer returned' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

  /**
   * Update customer (ADMIN only)
   */
  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update customer (ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Customer updated' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, dto);
  }

  /**
   * Delete customer (ADMIN only)
   */
  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete customer (ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Customer deleted' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
