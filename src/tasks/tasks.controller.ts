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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Create task (ADMIN only)
   */
  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create and assign a task (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  /**
   * Get tasks
   * ADMIN: all tasks
   * EMPLOYEE: only assigned tasks
   */
  @Get()
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get tasks (role-based access)' })
  @ApiResponse({ status: 200, description: 'Tasks returned' })
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  /**
   * Get task by ID
   * ADMIN: any task
   * EMPLOYEE: only own task
   */
  @Get(':id')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({ status: 200, description: 'Task returned' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findById(@Param('id') id: string, @Req() req) {
    return this.tasksService.findById(id, req.user);
  }

  /**
   * Update task status
   * ADMIN: any task
   * EMPLOYEE: only own task
   */
  @Patch(':id/status')
  @Roles('ADMIN', 'EMPLOYEE')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Task status updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTaskStatusDto,
    @Req() req,
  ) {
    return this.tasksService.updateStatus(id, dto, req.user);
  }
}
