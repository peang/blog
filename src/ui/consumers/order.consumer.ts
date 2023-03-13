import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class TestConsumer {
    @MessagePattern('order.created') // Our topic name
    orderCreated(@Payload() message) {
        return message;
    }
}
