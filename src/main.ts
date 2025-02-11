import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const start = Date.now();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // добавим базовый swagger
  const config = new DocumentBuilder()
    .setTitle('Finnplay API')
    .setDescription('Brainex test task')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    // из .env или react дефолт http://localhost:3333 в соответствии с файлом конфигурации
    origin: [configService.get<string>('frontendUrl')],
    credentials: true,
    // можно добавить остальные методы, но в данном задании они не нужны ('PUT', 'DELETE', 'OPTIONS')
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // из .env или 3000 в соответствии с файлом конфигурации
  const port = configService.get<number>('port');
  try {
    await app.listen(port ?? 3000);

    const end = Date.now();
    const elapsed = end - start;

    console.log(
      `🚀 Server running on http://localhost:${port} (started in ${elapsed}ms)`,
    );
  } catch (error) {
    console.error('❌ Error starting the application:', error);
  }
}

bootstrap();
