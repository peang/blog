import { Inject, Injectable } from '@nestjs/common';
import { BlogCreateDTO } from 'src/application/dtos/blog/BlogCreate.dto';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
import { BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { IUseCase } from "../IUseCase";

@Injectable()
export class BlogCreateUseCase implements IUseCase {
  constructor(
    @Inject("BlogRepositoryInterface") private readonly BlogRepository: BlogRepositoryInterface,
  ) { }

  public async execute(dto: BlogCreateDTO): Promise<BlogEntity | null> {
    // prechecking if bolog exist

    // ...

    const blog = BlogEntity.create(dto.title, dto.content, dto.author);
    await this.BlogRepository.create(blog);

    return blog;
  }
}