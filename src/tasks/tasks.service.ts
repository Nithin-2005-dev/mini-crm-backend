import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ADMIN: create and assign task
   */
  async create(dto: CreateTaskDto) {
    // Ensure assigned user exists and is EMPLOYEE
    const user = await this.prisma.user.findUnique({
      where: { id: dto.assignedToId },
    });

    if (!user || user.role !== 'EMPLOYEE') {
      throw new ForbiddenException('Task can only be assigned to an EMPLOYEE');
    }

    // Ensure customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        assignedToId: dto.assignedToId,
        customerId: dto.customerId,
      },
    });
  }

  /**
   * ADMIN: all tasks
   * EMPLOYEE: only own tasks
   */
  async findAll(user: { userId: string; role: string }) {
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({
        include: {
          customer: true,
          assignedTo: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.task.findMany({
      where: { assignedToId: user.userId },
      include: {
        customer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * ADMIN: any task
   * EMPLOYEE: only own task
   */
  async findById(id: string, user: { userId: string; role: string }) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        customer: true,
        assignedTo: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (user.role === 'EMPLOYEE' && task.assignedToId !== user.userId) {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  /**
   * ADMIN & EMPLOYEE (own task only): update status
   */
  async updateStatus(
    id: string,
    dto: UpdateTaskStatusDto,
    user: { userId: string; role: string },
  ) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (user.role === 'EMPLOYEE' && task.assignedToId !== user.userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.task.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
