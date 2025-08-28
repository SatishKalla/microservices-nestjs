import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskEvent } from './events/create-task.event';

@Injectable()
export class AppService {
  private readonly tasks: any[] = [];

  handleCreateTask(data: CreateTaskEvent) {
    this.tasks.push(data);
    Logger.log(`Task created: ${JSON.stringify(data)}`);
  }

  getTasks() {
    Logger.log(`Fetching all tasks`);
    return this.tasks;
  }
}
