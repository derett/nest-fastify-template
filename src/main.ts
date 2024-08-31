import { NestFactory } from '@nestjs/core';
import { envConfig } from './shared/configs';
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

  await app.listen(envConfig.port, '0.0.0.0');
}
bootstrap();
