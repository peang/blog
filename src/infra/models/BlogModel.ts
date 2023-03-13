import { BeforeCreate, BeforeUpdate, Column, Model, Table } from 'sequelize-typescript';
import { BlogEntity } from 'src/domain/entities/BlogEntity';
@Table({
  tableName: 'blog',
  timestamps: true,
  underscored: true
})
export class BlogModel extends Model<BlogModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  author: string;
  
  @Column
  content: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BeforeCreate
  static bfrCreate(model): void {
    model.created_at = new Date()
  }

  @BeforeUpdate
  static bfrUpdate(model): void {
    model.updated_at = new Date()
  }

  public static toModel(entity: BlogEntity) {
    return {
      id: entity.getId(),
      title: entity.getTitle(),
      author:entity.getAuthor(),
      content: entity.getContent(),
      created_at: entity.getCreatedAt(),
      updated_at: entity.getUpdateAt(),
    }
  }

  public static toEntity(model: BlogModel): BlogEntity {
    return BlogEntity.load(
      model.id,
      model.title,
      model.author,
      model.content,
      model.created_at,
      model.updated_at,
    )
  }
}