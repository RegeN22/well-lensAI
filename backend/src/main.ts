import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication, VersioningType } from '@nestjs/common';


async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Well-LensAI API')
    .setDescription('Well-LensAI API - only tochnitchanim allowed!')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000
  await app.listen(port);
}
bootstrap();
