import { Inject, Injectable } from '@nestjs/common';
import { BlogDeleteDTO } from 'src/application/dtos/blog/BlogDelete.dto';
import { BlogNotFoundException } from 'src/application/exceptions/blog/BlogNotFoundException';
import { BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { IUseCase } from "../IUseCase";

@Injectable()
export class BlogDeleteUseCase implements IUseCase {
  constructor(
    @Inject("BlogRepositoryInterface") private readonly BlogRepository: BlogRepositoryInterface,
  ) { }

  public async execute(dto: BlogDeleteDTO): Promise<void> {
    const blog = await this.BlogRepository.detail(dto.id);
    if (!blog) {
      throw new BlogNotFoundException();
    }

    return await this.BlogRepository.delete(blog)
  }
}