// tag-list options
export interface ITagListOptions {
  limit: number;
  offset: number;
}

// tag-data structure
export interface ITagResult {
  id: number;
  title: string;
  status: number;
  createdTime: Date;
  updatedTime: Date;
}

// tag-list service result
export interface ITagListResult {
  tagList: ITagResult[];
  totalCount: number;
}

// tag-create service options
export interface ITagCreateOptions {
  title: string;
}

// tag-update service options
export interface ITagUpdates {
  title: string;
}

// tag-Service abstractions
export interface ITagService {
  list(options: ITagListOptions): Promise<ITagListResult>;
  find(id: number): Promise<ITagResult>;
  create(options: ITagCreateOptions): Promise<number>;
  update(id: number, updates: ITagUpdates): Promise<boolean>;
  softDelete(id: number): Promise<boolean>;
}
