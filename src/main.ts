import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { HttpModule } from './ui/http.module';
import { LogtailLogger } from './ui/services/LogtailLogger';

async function bootstrap() {
  const app = await NestFactory.create(HttpModule, {
    logger: process.env.NODE_ENV !== 'local' ? new LogtailLogger() : new Logger(),
  });
  
  app.enableVersioning({
    type: VersioningType.URI
  });

  await app.listen(
    process.env.NODE_PORT, () => {
      console.log(`Started on Port : ${process.env.NODE_PORT}`)
    }
  );
}


bootstrap();
