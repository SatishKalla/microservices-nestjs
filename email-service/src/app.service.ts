import { Injectable } from '@nestjs/common';
import { SendEmailEvent } from './events/send-email.event';

@Injectable()
export class AppService {
  handleSendEmail(data: SendEmailEvent) {
    console.log('Request hit to email Service and email is - ', data.email);
    // Logic to send email here
  }
}
