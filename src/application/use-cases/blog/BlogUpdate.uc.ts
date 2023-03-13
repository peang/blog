import { Inject, Injectable } from '@nestjs/common';
import { BlogUpdateDTO } from 'src/application/dtos/blog/BlogUpdate.dto';
import { BlogNotFoundException } from 'src/application/exceptions/blog/BlogNotFoundException';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
import { BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { IUseCase } from "../IUseCase";

@Injectable()
export class BlogUpdateUseCase implements IUseCase {
  constructor(
    @Inject("BlogRepositoryInterface") private readonly BlogRepository: BlogRepositoryInterface,
  ) { }

  public async execute(dto: BlogUpdateDTO): Promise<BlogEntity | null> {
    const blog = await this.BlogRepository.detail(dto.id);
    if (!blog) {
      throw new BlogNotFoundException();
    }

    if (dto.title) {
      blog.updateTitle(dto.title);
    }

    if (dto.author) {
      blog.updateAuthor(dto.author);
    }

    if (dto.content) {
      blog.updateContent(dto.content);
    }

    await this.BlogRepository.update(blog);

    return blog;
  }
}