import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class BlogDetailDTO extends DTOAdapter {
  constructor(
    public readonly id: number,
  ) {
    super();
  }

  public static async getPayload(payload: IApiRequest): Promise<BlogDetailDTO> {
    payload = await DTOAdapter.validate(payload, Joi.object({
      param: Joi.object({
        id: Joi.number().required(),
      }),
    }));

    return new BlogDetailDTO(
      payload.param.id,
    );
  }
}