import { controller, get, post, provide, inject } from 'midway'
import { IBlogService } from '../../interface/blog'

@provide()
@controller('/api/blogs')
export class BlogController {
  @inject()
  blogService: IBlogService

  @get('/')
  async index(ctx) {
    const { limit, offset } = ctx.query
    const query = {
      limit: parseInt(limit, 10) || limit,
      offset: parseInt(offset, 10) || offset
    }

    ctx.body = await this.blogService.list(query)
  }

  @get('/:id')
  async find(ctx) {
    const { id } = ctx.params

    ctx.body = await this.blogService.find(id)
  }

  @post('/create')
  async create(ctx) {
    const { body } = ctx.request
    ctx.body = await this.blogService.create(body)
  }

  @post('/update')
  async update(ctx) {
    const { body } = ctx.request
    const { id, updates } = body
    ctx.body = await this.blogService.update(id, updates)
  }

  @post('/delete')
  async delete(ctx) {
    const { body } = ctx.request
    const { id } = body
    ctx.body = await this.blogService.softDelete(id)
  }
}
