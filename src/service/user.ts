import { provide, inject } from 'midway'
import { IUserService, IUserListOptions, IUserListResult } from '../interface/user'
import { IUserModel } from '../model/user'

@provide('userService')
export class UserService implements IUserService {

  @inject()
  UserModel: IUserModel

  async list(options: IUserListOptions): Promise<IUserListResult> {
    const result = await this.UserModel
    .scope('avaliable')
    .findAndCountAll({
      limit: options.limit,
      offset: options.offset,
    })

    return {
      userList: result.rows,
      totalCount: result.count,
    }
  }
}
