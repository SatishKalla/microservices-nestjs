import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = parseInt(process.env.REDIS_PORT) || 6379;
    this.client = new Redis({ host, port });
  }

  onModuleDestroy() {
    this.client.disconnect();
  }

  getClient(): Redis {
    return this.client;
  }

  async publish(channel: string, payload: any) {
    await this.client.publish(channel, JSON.stringify(payload));
  }

  subscribe(channel: string, handler: (data: any) => void) {
    this.client.subscribe(channel);
    this.client.on('message', (ch, message) => {
      if (ch === channel) handler(JSON.parse(message));
    });
  }
}
