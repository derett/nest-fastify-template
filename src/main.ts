import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.setGlobalPrefix('api');

  await app.listen(5000, '0.0.0.0');
}
bootstrap();
