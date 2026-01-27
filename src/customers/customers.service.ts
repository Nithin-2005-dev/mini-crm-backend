import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    const { email, phone } = dto;

    const existing = await this.prisma.customer.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existing) {
      throw new ConflictException(
        'Customer with given email or phone already exists',
      );
    }

    return this.prisma.customer.create({
      data: dto,
    });
  }

  /**
   * Get customers with pagination and search
   */
  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              email: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              phone: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              company: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  /**
   * Update customer
   */
  async update(id: string, dto: UpdateCustomerDto) {
    await this.findById(id);

    if (dto.email || dto.phone) {
      const existing = await this.prisma.customer.findFirst({
        where: {
          OR: [{ email: dto.email }, { phone: dto.phone }],
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException(
          'Customer with given email or phone already exists',
        );
      }
    }

    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Delete customer
   */
  async remove(id: string) {
    await this.findById(id);

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
