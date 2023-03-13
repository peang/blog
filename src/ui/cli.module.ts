import { Module } from '@nestjs/common';

const providers = [
  // CronSuccessCommand,
  // CronFailCommand,
  // TestCommand
  // ReindexProductCommand,
];

@Module({
  imports: [
  ],
  providers: providers,
  exports: providers,
})
export class CliModule { }
