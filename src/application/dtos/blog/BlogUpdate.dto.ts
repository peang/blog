import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class BlogUpdateDTO extends DTOAdapter {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly author: string,
    public readonly content: string,
  ) {
    super();
  }

  public static async getPayload(payload: IApiRequest): Promise<BlogUpdateDTO> {
    payload = await DTOAdapter.validate(payload, Joi.object({
      param: {
        id: Joi.required(),
      },
      body: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        content: Joi.string().required(),
      }),
    }));

    return new BlogUpdateDTO(
      payload.param.id,
      payload.body.title,
      payload.body.author,
      payload.body.content
    );
  }
}