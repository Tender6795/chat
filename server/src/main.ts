import { NestFactory } from '@nestjs/core';
import * as cookieParcer from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cookieParcer());

  app.enableCors();

  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
