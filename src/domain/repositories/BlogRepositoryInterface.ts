import { IMetaResponse } from "src/application/types/app";
import { BlogEntity } from "../entities/BlogEntity";

export type BlogRepositoryFilter = {
    id?: number,
    title?: string,
    author?: string,
  }

export interface BlogRepositoryInterface {
    list(page: number, perPage: number, filter: Partial<BlogRepositoryFilter>, sort: string): Promise<{ data: BlogEntity[]; meta: IMetaResponse; }>;

    detail(id: number): Promise<BlogEntity>;

    create(entity: BlogEntity): Promise<void>;

    update(entity: BlogEntity): Promise<void>;

    delete(entity: BlogEntity): Promise<void>;
}