import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class BlogCreateDTO extends DTOAdapter {
  constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly content: string,
  ) {
    super();
  }

  public static async getPayload(payload: IApiRequest): Promise<BlogCreateDTO> {
    payload = await DTOAdapter.validate(payload, Joi.object({
      body: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        content: Joi.string().required(),
      }),
    }));

    return new BlogCreateDTO(
      payload.body.title,
      payload.body.author,
      payload.body.content
    );
  }
}