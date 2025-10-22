import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('PaymentService', 'ProcessPayment')
  processPayment(data: { orderId: number; amount: number }) {
    return {
      status: 'success',
      transactionId: 'TXN-' + Date.now(),
      data,
    };
  }
}
