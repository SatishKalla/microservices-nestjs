import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateTaskEvent } from './events/create-task.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-task')
  handleCreateTask(data: CreateTaskEvent) {
    this.appService.handleCreateTask(data);
  }

  @MessagePattern({ cmd: 'get-tasks' })
  getTasks() {
    return this.appService.getTasks();
  }
}
