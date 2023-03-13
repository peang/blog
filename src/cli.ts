#!/usr/bin/env node

import 'dotenv/config';
import { CommandFactory } from 'nest-commander';
import { CliModule } from './ui/cli.module';

const bootstrap = async () => {
  await CommandFactory.run(CliModule, {
    logger: ['warn', 'error'],
    errorHandler: (err) => {
      console.error(err);
      process.exit(0);
    }
  })
    .finally(() => {
      process.exit(0);
    });
};

bootstrap();