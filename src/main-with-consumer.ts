import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { HttpModule } from './ui/http.module';


async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create<NestExpressApplication>(HttpModule);
    
    const brokers: string[] = process.env.PUBSUB_CLIENT_BROKERS.split(',');
    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: brokers,
            },
            consumer: {
                groupId: process.env.PUBSUB_CONSUMER_GROUP_ID,
            }
        }
    })

    app.startAllMicroservices();
    await app.listen(
        process.env.NODE_PORT
    );
}

bootstrap();
