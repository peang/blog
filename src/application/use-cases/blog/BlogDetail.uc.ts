import { Inject, Injectable } from '@nestjs/common';
import { BlogDetailDTO } from 'src/application/dtos/blog/BlogDetail.dto';
import { BlogNotFoundException } from 'src/application/exceptions/blog/BlogNotFoundException';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
import { BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { IUseCase } from "../IUseCase";

@Injectable()
export class BlogDetailUseCase implements IUseCase {
  constructor(
    @Inject("BlogRepositoryInterface") private readonly BlogRepository: BlogRepositoryInterface,
  ) { }

  public async execute(dto: BlogDetailDTO): Promise<BlogEntity> {
    const blog = await this.BlogRepository.detail(dto.id);

    if (!blog) {
      throw new BlogNotFoundException()
    }

    return blog;
  }
}