import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerLoader(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Booking service example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('booking')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
