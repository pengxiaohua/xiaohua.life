import { provide, inject } from 'midway';
import {
  ITagService,
  ITagCreateOptions,
  ITagListResult,
  ITagListOptions,
  ITagResult,
  ITagUpdates
} from '../interface/tag';
import { ITagModel } from '../model/tag';

@provide('tagService')
export class TagService implements ITagService {

  @inject()
  TagModel: ITagModel;

  async list(options: ITagListOptions): Promise<ITagListResult> {
    const result = await this.TagModel
    .findAndCountAll({
      limit: options.limit,
      offset: options.offset,
    });
    
    return {
      tagList: result.rows,
      totalCount: result.count
    };
  }

  async find(id: number): Promise<ITagResult> {
    const tag = await this.TagModel
    // .scope('avaliable')
    .findByPrimary(id);

    return tag;
  }

  async create(options: ITagCreateOptions): Promise<number> {
    const tag = await this.TagModel.create(options);

    return tag.id;
  }

  async update(id: number, updates: ITagUpdates): Promise<boolean> {
    const updateResult = await this.TagModel
    .scope('avaliable')
    .update(updates, {
      where: { id }
    });

    return updateResult[0] > 0;
  }

  async softDelete(id: number): Promise<boolean> {
    const softDeleteResult = await this.TagModel
    .scope('avaliable')
    .update({ status: 0 }, {
      where: { id }
    });

    return softDeleteResult[0] > 0;
  }

}
