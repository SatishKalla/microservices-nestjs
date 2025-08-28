import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EmailRequest } from './dto/email-request.dto';
import { SendEmailEvent } from './events/send-email.event';
import { CreateTask } from './dto/create-task.dto';
import { CreateTaskEvent } from './events/create-task.event';
import { CreateUser } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';

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
    try {
      if (!userRequest.name || !userRequest.email || !userRequest.age) {
        throw new Error('Name, email, and age are required');
      }
      this.users.push(userRequest);
      return {
        message: 'User created successfully',
        data: userRequest,
      };
    } catch (error) {
      return {
        message: 'User creation failed',
        error: error.message,
      };
    }
  }

  getUsers() {
    try {
      return {
        message: 'User retrieved successfully',
        data: this.users,
      };
    } catch (error) {
      return {
        message: 'User retrieval failed',
        error: error.message,
      };
    }
  }

  sendEmail(emailRequest: EmailRequest) {
    try {
      if (!emailRequest.email || !emailRequest.subject) {
        throw new Error('Email and subject are required');
      }

      this.emails.push(emailRequest);
      const { email, subject } = emailRequest;
      this.emailServiceClient.emit(
        'send-email',
        new SendEmailEvent(email, subject),
      );
      return {
        message: 'Email sent successfully',
        data: emailRequest,
      };
    } catch (error) {
      return {
        message: 'Email sending failed',
        error: error.message,
      };
    }
  }

  createTask(taskRequest: CreateTask) {
    try {
      if (!taskRequest.description || !taskRequest.estimatedDays) {
        throw new Error('Description and estimatedDays are required');
      }

      this.tasks.push(taskRequest);
      const { description, estimatedDays } = taskRequest;
      this.taskServiceClient.emit(
        'create-task',
        new CreateTaskEvent(description, estimatedDays),
      );
      return {
        message: 'Task created successfully',
        data: taskRequest,
      };
    } catch (error) {
      return {
        message: 'Task creation failed',
        error: error.message,
      };
    }
  }

  async getTasks() {
    try {
      const result = await firstValueFrom(
        this.taskServiceClient.send({ cmd: 'get-tasks' }, {}),
      );
      return {
        message: 'Tasks retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        message: 'Task retrieval failed',
        error: error.message,
      };
    }
  }
}
