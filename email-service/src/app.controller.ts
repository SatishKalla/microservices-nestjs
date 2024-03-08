import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { SendEmailEvent } from './events/send-email.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send-email')
  handleSendEmail(data: SendEmailEvent) {
    this.appService.handleSendEmail(data);
  }
}
