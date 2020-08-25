// user list service options
export interface IUserListOptions {
  limit: number
  offset: number
}

// User-Service response
export interface IUserResult {
  id: number
  userName: string
  gender: number
  status: number
  createdTime: Date
  updatedTime: Date
}

// user list service result
export interface IUserListResult {
  userList: IUserResult[]
  totalCount: number
}

// User-Service abstractions
export interface IUserService {
  list(options: IUserListOptions): Promise<IUserListResult>
}
