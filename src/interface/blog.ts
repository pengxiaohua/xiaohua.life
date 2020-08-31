// blog-list options
export interface IBlogListOptions {
  limit: number;
  offset: number;
}

// blog-data structure
export interface IBlogResult {
  id: number;
  title: string;
  content: string;
  tags: string;
  status: number;
  createdTime: Date;
  updatedTime: Date;
}

// blog-list service result
export interface IBlogListResult {
  blogList: IBlogResult[];
  totalCount: number;
}

// blog-create service options
export interface IBlogCreateOptions {
  title: string;
  content: string;
  tags: string;
}

// blog-update service options
export interface IBlogUpdates {
  title: string;
  content: string;
  tags: string;
}

// blog-Service abstractions
export interface IBlogService {
  list(options: IBlogListOptions): Promise<IBlogListResult>;
  find(id: number): Promise<IBlogResult>;
  create(options: IBlogCreateOptions): Promise<number>;
  update(id: number, updates: IBlogUpdates): Promise<boolean>;
  softDelete(id: number): Promise<boolean>;
}
