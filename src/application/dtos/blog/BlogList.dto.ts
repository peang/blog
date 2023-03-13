import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { BlogRepositoryFilter } from 'src/domain/repositories/BlogRepositoryInterface';
import { DTOAdapter } from "../DTOAdapter";

export class BlogListDTO extends DTOAdapter {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly sort: string,
    public readonly filter: Partial<BlogRepositoryFilter>,
  ) {
    super();
  }

  public static async getPayload(payload: IApiRequest): Promise<BlogListDTO> {
    payload = await DTOAdapter.validate(payload, Joi.object({
      query: Joi.object({
        page: Joi.number().optional().default(1),
        perPage: Joi.number().optional().default(10),
        sort: Joi.string().default('id'),
        title: Joi.string().optional().allow(null),
        author: Joi.string().optional().allow(null),
      }),
    }));

    return new BlogListDTO(
      payload.query.page,
      payload.query.perPage,
      payload.query.sort,
      {
        title: payload.query.title,
        author: payload.query.author,
      },
    );
  }
}