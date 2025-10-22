import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface PaymentService {
  processPayment(data: { orderId: number; amount: number }): any;
}

@Injectable()
export class AppService implements OnModuleInit {
  private paymentService: PaymentService;

  constructor(@Inject('PAYMENT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.paymentService =
      this.client.getService<PaymentService>('PaymentService');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createOrder() {
    const response = await firstValueFrom(
      this.paymentService.processPayment({
        orderId: Date.now(),
        amount: 99.99,
      }),
    );

    return { orderId: Date.now(), payment: response };
  }
}
