import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async createOrder() {
    return this.appService.createOrder();
  }

  @Post('publish-order-redis')
  async publishOrderRedis() {
    return this.appService.publishOrderRedis();
  }
}
