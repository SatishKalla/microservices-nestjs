import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './shared/redis/redis.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly redisService: RedisService) {}

  onModuleInit() {
    this.redisService.subscribe('order_created', (order) => {
      console.log('🪙 Processing payment for order:', order);
      this.processOrder(order);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  private processOrder(order: { orderId: number; amount: number }) {
    console.log('💳 Processing order:', order.orderId);
    setTimeout(() => {
      console.log(`✅ Order processed successfully: ${order.orderId}`);
    }, 10000);
  }
}
