import { Logger } from "@nestjs/common";
import { LogtailLogger } from "../../ui/services/LogtailLogger";

export enum Events {

}
export class BaseEvent {
  constructor() {
    const logger = process.env.NODE_ENV !== 'local' ? new LogtailLogger() : new Logger();
    logger.verbose(`Event Triggered : ${this.constructor.name}`)
  }
}
