import { providerWrapper } from 'midway';
import { DataType, Table, Model, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';

const { STRING, INTEGER, TEXT } = DataType;

// using factory style to provide Model because most useful
// sequelize methods are static in Model class. If you use
// @provide style, this class will be initialized when injected.
export const factory = () => BlogModel;
providerWrapper([
    {
      id: 'BlogModel',
      provider: factory
    },
]);

// you need to export the type of Model class to ensure
// type-safety outside
export type IBlogModel = typeof BlogModel;
@Table({
  freezeTableName: true,
  tableName: 'blogs'
})
export class BlogModel extends Model<BlogModel> {
  @Column({
    type: INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: 'blog id'
  })
  id: number;

  @Column({
    field: 'title',
    type: STRING(50),
    allowNull: false,
    comment: 'blog title'
  })
  title: string;

  @Column({
    field: 'content',
    type: TEXT,
    allowNull: false,
    comment: '博客内容'
  })
  content: string;

  @Column({
    type: STRING(50),
    comment: 'tag'
  })
  tags: string;

  @Column({
    type: INTEGER(2),
    allowNull: false,
    defaultValue: 2,
    comment: '删除状态，1已发布，0已删除，2保存草稿'
  })
  status: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdTime: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedTime: Date;
}
