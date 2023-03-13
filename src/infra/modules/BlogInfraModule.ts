import { Module } from '@nestjs/common';
import { InfraModule } from '../infra.module';
import { BlogSQLRepository } from '../repositories/BlogRepository';

const repositories = [
  {
    provide: 'BlogRepositoryInterface',
    useClass: BlogSQLRepository,
  }
]

const services = []

@Module({
  imports: [
    InfraModule
  ],
  controllers: [],
  providers: [
    ...repositories,
    ...services,
  ],
  exports: [
    ...repositories,
    ...services,
  ]
})
export class BlogInfraModule { }
