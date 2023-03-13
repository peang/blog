import { BlogRepositoryFilter, BlogRepositoryInterface } from 'src/domain/repositories/BlogRepositoryInterface';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
import { RepositoryHelper } from 'src/infra/helpers/RepositoryHelper';
import { Op } from 'sequelize';
import { IMetaResponse } from 'src/application/types/app';
import { BlogModel } from '../models/BlogModel';

export class BlogSQLRepository implements BlogRepositoryInterface {
    public async list(page: number, perPage: number, filter: Partial<BlogRepositoryFilter>, sort: string): Promise<{ data: BlogEntity[]; meta: IMetaResponse; }> {
        const { offset, limit } = RepositoryHelper.getOffsetLimit(page, perPage);
        const sorted: any = RepositoryHelper.sorter(sort);

        const where = {};
        if (filter.id) {
            where['id'] = filter.id;
        }

        if (filter.title) {
            where['title'] = {
                [Op.iLike]: `%${filter.title}%`
            }
        }

        if (filter.author) {
            where['author'] = {
                [Op.iLike]: `%${filter.author}%`
            }
        }

        const {
            rows,
            count,
        } = await BlogModel.findAndCountAll({
            limit: limit,
            offset: offset,
            order: sorted,
            where,
        })

        return {
            data: rows.map((entities: BlogModel) => {
                return BlogModel.toEntity(entities)
            }),
            meta: RepositoryHelper.generateMeta(page, perPage, count)
        };
    }

    public async detail(id: number): Promise<BlogEntity> {
        const model = await BlogModel.findOne({
            where: {
                id,
            },
        });
        if (!model) {
            return null;
        }

        return BlogModel.toEntity(model);
    }

    public async create(entity: BlogEntity): Promise<void> {
        const blog = await BlogModel.create(BlogModel.toModel(entity));

        entity.updateId(blog.id);
    }

    public async update(entity: BlogEntity): Promise<void> {
        await BlogModel.update(BlogModel.toModel(entity), {
            where: {
                id: entity.getId()
            }
        });
    }

    public async delete(entity: BlogEntity): Promise<void> {
        await BlogModel.destroy({
            where: {
                id: entity.getId(),
            }
        });
    }
}