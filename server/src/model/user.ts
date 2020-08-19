import { providerWrapper } from 'midway'
import { DataType, Table, Model, Column, CreatedAt, UpdatedAt, Scopes } from 'sequelize-typescript'

const { STRING, INTEGER } = DataType

// using factory style to provide Model because most useful
// sequelize methods are static in Model class. If you use
// @provide style, this class will be initialized when injected.
export const factory = () => UserModel
providerWrapper([
    {
      id: 'UserModel',
      provider: factory
    },
])

// you need to export the type of Model class to ensure
// type-safety outside
export type IUserModel = typeof UserModel

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
  tableName: 'users'
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: INTEGER(255),
    primaryKey: true,
    autoIncrement: true,
    comment: 'user id'
  })
  id: number

  @Column({
    field: 'user_name',
    type: STRING(255),
    comment: '用户名'
  })
  userName: string

  @Column({
    type: INTEGER(255),
    comment: '性别，1男性，0女性'
  })
  gender: number

  @Column({
    type: INTEGER(11),
    allowNull: false,
    defaultValue: 1,
    comment: '删除状态，1没删除，0已删除'
  })
  status: number

  @CreatedAt
  @Column({ field: 'created_at' })
  createdTime: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedTime: Date
}
