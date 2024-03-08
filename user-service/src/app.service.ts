import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailRequest } from './dto/email-request.dto';
import { SendEmailEvent } from './events/send-email.event';
import { CreateTask } from './dto/create-task.dto';
import { CreateTaskEvent } from './events/create-task.event';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  private readonly emails: any[] = [];
  private readonly tasks: any[] = [];

  constructor(
    @Inject('EMAILS_SERVICE') private readonly emailServiceClient: ClientProxy,
    @Inject('TASKS_SERVICE') private readonly taskServiceClient: ClientProxy,
  ) {}

  createUser(userRequest: CreateUser) {
    this.users.push(userRequest);
  }

  getUsers() {
    return this.users;
  }

  sendEmail(emailRequest: EmailRequest) {
    this.emails.push(emailRequest);
    const { email, subject } = emailRequest;
    this.emailServiceClient.emit(
      'send-email',
      new SendEmailEvent(email, subject),
    );
  }

  createTask(taskRequest: CreateTask) {
    this.tasks.push(taskRequest);
    const { description, estimatedDays } = taskRequest;
    this.taskServiceClient.emit(
      'create-task',
      new CreateTaskEvent(description, estimatedDays),
    );
  }

  getTasks() {
    return this.taskServiceClient.send({ cmd: 'get-tasks' }, {});
  }
}
