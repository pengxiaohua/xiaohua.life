import { controller, get, post, provide, inject } from 'midway';
import { ITagService } from '../../interface/tag';

@provide()
@controller('/api/tags')
export class TagController {
  @inject()
  tagService: ITagService;

  @get('/')
  async index(ctx) {
    const { limit, offset } = ctx.query;
    const query = {
      limit: parseInt(limit, 10) || 10,
      offset: parseInt(offset, 10) || 0,
    };

    ctx.body = await this.tagService.list(query);
  }

  @get('/:id')
  async find(ctx) {
    const { id } = ctx.params;

    ctx.body = await this.tagService.find(id);
  }

  @post('/create')
  async create(ctx) {
    const { body } = ctx.request;
    ctx.body = await this.tagService.create(body);
  }

  @post('/update')
  async update(ctx) {
    const { body } = ctx.request;
    const { id, updates } = body;
    ctx.body = await this.tagService.update(id, updates);
  }

  @post('/delete')
  async delete(ctx) {
    const { body } = ctx.request;
    const { id } = body;
    ctx.body = await this.tagService.softDelete(id);
  }
}
