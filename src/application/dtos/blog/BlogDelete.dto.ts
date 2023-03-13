import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class BlogDeleteDTO extends DTOAdapter {
  constructor(
    public readonly id: number,
  ) {
    super();
  }

  public static async getPayload(payload: IApiRequest): Promise<BlogDeleteDTO> {
    payload = await DTOAdapter.validate(payload, Joi.object({
      param: {
        id: Joi.required(),
      },
    }));

    return new BlogDeleteDTO(
      payload.param.id
    );
  }
}