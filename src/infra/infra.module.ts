import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogModel } from './models/BlogModel';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      logging: process.env.SQL_LOGGING === 'true' ? console.log : false,
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT),
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB,
      models: [
        BlogModel,
      ],
      synchronize: false
    }),
  ],
  controllers: [],
  providers: [
    Logger,
  ],
  exports: [
    Logger,
    // ElasticsearchModule,
  ],
})
export class InfraModule { }
