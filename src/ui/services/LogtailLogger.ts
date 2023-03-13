import { Logtail } from '@logtail/node';
import { ConsoleLogger, Injectable, LoggerService, SetMetadata } from '@nestjs/common';

export const Action = (action: string) => SetMetadata('action', action);
export const ALL_ROLE = '*';
export const ALL_SCOPE = '*';

declare type LogLevels = 'local' | 'development' | 'staging' | 'production';
@Injectable()
export class LogtailLogger extends ConsoleLogger implements LoggerService {
  private logger: Logtail;
  protected logEnabled = false;
  protected warnEnabled = false;
  protected debugEnabled = false;
  protected verboseEnabled = false;
  protected errorEnabled = false;

  constructor(private readonly logLevel: LogLevels = 'development') {
    super();

    if (!process.env.LOGTAIL_TOKEN) {
      throw new Error("LOGTAIL_TOKEN env not set!")
    }

    this.setupLogLevel();

    this.logger = new Logtail(process.env.LOGTAIL_TOKEN);
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.logEnabled) {
      this.logger.log(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (this.errorEnabled) {
      this.logger.error(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.warnEnabled) {
      this.logger.warn(message, ...optionalParams);
    }
  }

  debug(message: any, ...optionalParams: any[]) {
    if (this.debugEnabled) {
      this.logger.log(message, ...optionalParams);
    }
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (this.verboseEnabled) {
      this.logger.log(message, ...optionalParams);
    }
  }

  protected setupLogLevel() {
    switch (this.logLevel) {
      case 'local':
        this.logEnabled = true;
        this.warnEnabled = true;
        this.debugEnabled = true;
        this.verboseEnabled = true;
        this.errorEnabled = true;
        break;
      case 'development':
        this.warnEnabled = true;
        this.debugEnabled = true;
        this.verboseEnabled = true;
        this.errorEnabled = true;
        break;
      case 'staging':
        this.warnEnabled = true;
        this.debugEnabled = true;
        this.verboseEnabled = true;
        this.errorEnabled = true;
        break;
      case 'production':
        this.errorEnabled = true;
        break;
    }
  }
}
