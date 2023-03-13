import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'test' })
export class TestCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<any> {
        console.log('Test Ok');
    }
}