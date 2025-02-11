import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  // константа для начального таймера времени запуска приложения
  const start = Date.now();

  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    // базовый конфиг swagger
    const config = new DocumentBuilder()
      .setTitle('Finnplay API')
      .setDescription('Brainex test task')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // можно добавить остальные методы, но в данном задании они не нужны ('PUT', 'DELETE', 'OPTIONS')
    app.enableCors({
      origin: [configService.get<string>('frontendUrl')],
      credentials: true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    const port = configService.get<number>('port') ?? 3000;
    await app.listen(port);

    const elapsed = Date.now() - start;
    console.log(
      `🚀 Server running on http://localhost:${port} (started in ${elapsed}ms)`,
    );
  } catch (error) {
    console.error('❌ Error starting the application:', error);
  }
}
// добавил void, даем понять линтеру, что нам не важен результат выполнения функции, т.к. мы обрабатываем ошибки выше
void bootstrap();
