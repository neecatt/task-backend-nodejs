import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  const logger = new Logger();
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
