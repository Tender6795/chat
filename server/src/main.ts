import { NestFactory } from '@nestjs/core';
import * as cookieParcer from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParcer())
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
