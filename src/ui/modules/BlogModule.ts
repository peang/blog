
import { Module } from '@nestjs/common';
import { BlogCreateUseCase } from 'src/application/use-cases/blog/BlogCreate.uc';
import { BlogDeleteUseCase } from 'src/application/use-cases/blog/BlogDelete.uc';
import { BlogDetailUseCase } from 'src/application/use-cases/blog/BlogDetail.uc';
import { BlogListUseCase } from 'src/application/use-cases/blog/BlogList.uc';
import { BlogUpdateUseCase } from 'src/application/use-cases/blog/BlogUpdate.uc';
import { BlogInfraModule } from 'src/infra/modules/BlogInfraModule';
import { AuthController } from '../controllers/v1/AuthController';
import { BlogController } from '../controllers/v1/BlogController';


const providers = [
  BlogListUseCase,
  BlogDetailUseCase,
  BlogCreateUseCase,
  BlogUpdateUseCase,
  BlogDeleteUseCase,
];
@Module({
  controllers: [
    AuthController,
    BlogController
  ],
  imports: [
    BlogInfraModule,
  ],
  providers: [
    ...providers,
  ],
  exports: providers
})
export class BlogModule {}