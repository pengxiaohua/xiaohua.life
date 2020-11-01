import { providerWrapper } from 'midway';
import { DataType, Table, Model, Column, CreatedAt, UpdatedAt } from 'sequelize-typescript';

const { STRING, INTEGER } = DataType;

// using factory style to provide Model because most useful
// sequelize methods are static in Model class. If you use
// @provide style, this class will be initialized when injected.
export const factory = () => TagModel;
providerWrapper([
    {
      id: 'TagModel',
      provider: factory
    },
]);

// you need to export the type of Model class to ensure
// type-safety outside
export type ITagModel = typeof TagModel;
// 等同于where，默认展示未删除的数据
@Scopes({
  avaliable: {
    where: {
      status: 1
    }
  }
})
@Table({
  freezeTableName: true,
  tableName: 'tags'
})
export class TagModel extends Model<TagModel> {
  @Column({
    type: INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: 'tag id'
  })
  id: number;

  @Column({
    type: STRING(50),
    allowNull: false,
    comment: 'tag name'
  })
  title: string;

  @Column({
    type: INTEGER(2),
    allowNull: false,
    defaultValue: 1,
    comment: '删除状态，1没删除，0已删除'
  })
  status: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdTime: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedTime: Date;
}
