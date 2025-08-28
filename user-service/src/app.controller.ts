import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailRequest } from './dto/email-request.dto';
import { CreateTask } from './dto/create-task.dto';
import { CreateUser } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-user')
  createUser(@Body() userRequest: CreateUser) {
    return this.appService.createUser(userRequest);
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('send-email')
  sendEmail(@Body() emailRequest: EmailRequest) {
    return this.appService.sendEmail(emailRequest);
  }

  @Post('create-task')
  createTask(@Body() taskRequest: CreateTask) {
    return this.appService.createTask(taskRequest);
  }

  @Get('tasks')
  async getTasks() {
    return await this.appService.getTasks();
  }
}
