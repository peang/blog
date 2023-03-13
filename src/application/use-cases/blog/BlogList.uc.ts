import { Inject, Injectable } from '@nestjs/common';
import { BlogListDTO } from 'src/application/dtos/blog/BlogList.dto';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
import { BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { IMetaResponse } from '../../types/app';
import { IUseCase } from "../IUseCase";

@Injectable()
export class BlogListUseCase implements IUseCase {
  constructor(
    @Inject("BlogRepositoryInterface") private readonly BlogRepository: BlogRepositoryInterface,
  ) { }

  public async execute(dto: BlogListDTO): Promise<{
    data: BlogEntity[],
    meta: IMetaResponse,
  }> {
    return await this.BlogRepository.list(
      dto.page,
      dto.perPage,
      dto.filter,
      dto.sort,
    )
  }
}