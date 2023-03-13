import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'cron-success'})
export class CronSuccessCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<any> {
        return 'SUCCESS';
    }
}