import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerLoader } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await swaggerLoader(app);
  await app.listen(3000);
}

bootstrap();
