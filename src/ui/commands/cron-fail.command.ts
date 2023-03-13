import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'cron-fail' })
export class CronFailCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<any> {
        throw new Error('error')
    }
}