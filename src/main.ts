import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import { ConfigsService } from './configs/configs.service';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configsService = app.get(ConfigsService);
  const port = configsService.get('PORT');


  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      in: 'header'
    })
    .setTitle('Music player api docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe(
    { transform: true }
  ));

  app.enableCors();

  await app.listen(port);
}
bootstrap();
