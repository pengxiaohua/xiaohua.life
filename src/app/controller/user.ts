import { Context, controller, get, inject, provide } from 'midway'
import { IUserService } from '../../interface'

@provide()
@controller('/users')
export class UserController {

  @inject()
  ctx: Context

  @inject('userService')
  service: IUserService

  @get('/')
  async index() {
    const { limit, offset } = this.ctx.query
    const query = {
      limit: parseInt(limit, 10) || 10,
      offset: parseInt(offset, 10) || 0
    }

    const result = await this.service.list(query)
    this.ctx.body = result
  }
}
