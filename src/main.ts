import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const options = new DocumentBuilder()
   .setTitle('ADN Technical Test')
    .setDescription('Feel Free To Test Any API')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('/')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

await app.listen(process.env.PORT || 3000);

}
bootstrap();
