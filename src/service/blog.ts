import { provide, inject } from 'midway'
import {
  IBlogService,
  IBlogCreateOptions,
  IBlogListResult,
  IBlogListOptions,
  IBlogResult,
  IBlogUpdates
} from '../interface/blog'
import { IBlogModel } from '../model/blog'

@provide('blogService')
export class BlogService implements IBlogService {

  @inject()
  BlogModel: IBlogModel

  async list(options: IBlogListOptions): Promise<IBlogListResult> {
    const result = await this.BlogModel
    .scope('avaliable')
    .findAndCountAll({
      limit: options.limit,
      offset: options.offset
    })
    
    return {
      blogList: result.rows,
      totalCount: result.count
    }
  }

  async find(id: number): Promise<IBlogResult> {
    const blog = await this.BlogModel
    .scope('avaliable')
    .findByPrimary(id)

    return blog
  }

  async create(options: IBlogCreateOptions): Promise<number> {
    const blog = await this.BlogModel.create(options)

    return blog.id
  }

  async update(id: number, updates: IBlogUpdates): Promise<boolean> {
    const updateResult = await this.BlogModel
    .scope('avaliable')
    .update(updates, {
      where: { id }
    })

    return updateResult[0] > 0
  }

  async softDelete(id: number): Promise<boolean> {
    const softDeleteResult = await this.BlogModel
    .scope('avaliable')
    .update({ status: 0 }, {
      where: { id }
    })

    return softDeleteResult[0] > 0
  }

}
