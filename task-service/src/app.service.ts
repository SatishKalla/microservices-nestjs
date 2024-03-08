import { Injectable } from '@nestjs/common';
import { CreateTaskEvent } from './events/create-task.event';

@Injectable()
export class AppService {
  private readonly tasks: any[] = [];

  handleCreateTask(data: CreateTaskEvent) {
    this.tasks.push(data);
    console.log('Request hit to task Service');
  }

  getTasks() {
    return this.tasks;
  }
}
