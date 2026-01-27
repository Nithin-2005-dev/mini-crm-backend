import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'EMPLOYEE')
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  @Roles('ADMIN', 'EMPLOYEE')
  findById(@Param('id') id: string, @Req() req) {
    return this.tasksService.findById(id, req.user);
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'EMPLOYEE')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
    @Req() req,
  ) {
    return this.tasksService.updateStatus(id, dto, req.user);
  }
}
