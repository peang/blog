import { ObjectSchema, Schema } from '@hapi/joi';
import { HttpException, NotImplementedException } from "@nestjs/common";

const defaultOptions = {
    stripUnknown: {
        arrays: false,
        objects: true,
    },
    abortEarly: false,
}
export class DTOAdapter {
    public static async validate(payload: Record<string, unknown>, schema: Schema, options: Record<string, unknown> = defaultOptions) {
        return schema.validateAsync(payload, options)
            .catch((err) => {
                const details = err.details.reduce((detail: any, item: any) => {
                    detail[item.context.key] = item.message.replace(/"/g, '');
                    return detail;
                }, {});
                throw new HttpException(details, 422);
            })
    }

    public getScheme(): ObjectSchema {
        throw new NotImplementedException();
    }
}