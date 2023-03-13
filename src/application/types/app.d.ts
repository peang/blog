export type IApiRequest = {
    query?: any;
    body?: any;
    param?: any;
}

export type IApiResponse = {
    message: string;
    data?: any;
    meta?: Record<string, unknown>
}

export type IMetaResponse = {
    page: number;
    perPage: number;
    totalPage: number
}