import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BlogCreateDTO } from 'src/application/dtos/blog/BlogCreate.dto';
import { BlogDeleteDTO } from 'src/application/dtos/blog/BlogDelete.dto';
import { BlogDetailDTO } from 'src/application/dtos/blog/BlogDetail.dto';
import { BlogListDTO } from 'src/application/dtos/blog/BlogList.dto';
import { BlogUpdateDTO } from 'src/application/dtos/blog/BlogUpdate.dto';
import { IApiResponse } from 'src/application/types/app';
import { BlogCreateUseCase } from 'src/application/use-cases/blog/BlogCreate.uc';
import { BlogDeleteUseCase } from 'src/application/use-cases/blog/BlogDelete.uc';
import { BlogDetailUseCase } from 'src/application/use-cases/blog/BlogDetail.uc';
import { BlogListUseCase } from 'src/application/use-cases/blog/BlogList.uc';
import { BlogUpdateUseCase } from 'src/application/use-cases/blog/BlogUpdate.uc';
import { RolesGuardService } from '../../services/RolesGuardService';

@Controller({
  path: '/blogs'
})
@UseGuards(new RolesGuardService(new Reflector()))
export class BlogController {
  constructor(
    private readonly blogListUseCase: BlogListUseCase,
    private readonly blogDetailUseCase: BlogDetailUseCase,
    private readonly blogCreateUseCase: BlogCreateUseCase,
    private readonly blogUpdateUseCase: BlogUpdateUseCase,
    private readonly blogDeleteUseCase: BlogDeleteUseCase,
  ) { }

  @Get()
  public async list(@Query() query): Promise<IApiResponse> {
    const dto = await BlogListDTO.getPayload({
      query
    });
    const result = await this.blogListUseCase.execute(dto);

    return {
      message: "Blog List",
      data: result.data,
      meta: result.meta,
    }
  }

  @Get('/:id')
  public async detail(@Param() param): Promise<IApiResponse> {
    const dto = await BlogDetailDTO.getPayload({
      param
    });
    const blog = await this.blogDetailUseCase.execute(dto);

    return {
      message: "Blog Detail",
      data: blog
    }
  }

  @Post()
  public async create(@Body() body): Promise<IApiResponse> {
    const dto = await BlogCreateDTO.getPayload({
      body
    });
    const blog = await this.blogCreateUseCase.execute(dto);

    return {
      message: "Blog Created",
      data: blog
    }
  }

  @Patch('/:id')
  public async update(@Body() body, @Param() param): Promise<IApiResponse> {
    const dto = await BlogUpdateDTO.getPayload({
      body,
      param
    });
    const blog = await this.blogUpdateUseCase.execute(dto);

    return {
      message: "Blog Updated",
      data: blog
    }
  }

  @Delete('/:id')
  public async delete(@Param() param): Promise<IApiResponse> {
    const dto = await BlogDeleteDTO.getPayload({
      param
    });
    await this.blogDeleteUseCase.execute(dto);

    return {
      message: "Blog Deleted",
      data: null
    }
  }
}
