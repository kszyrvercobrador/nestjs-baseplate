import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import validationExceptionFactory from './exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: validationExceptionFactory,
    errorHttpStatusCode: 422,
    enableDebugMessages: true,
    validationError: {
      target: true,
      value: true,
    }
  }));

  await app.listen(3000);
}
bootstrap();
