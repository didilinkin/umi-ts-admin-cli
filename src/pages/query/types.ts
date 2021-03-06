import { Map } from 'immutable'

export interface TotalStateItem {
  title: string
  name: string
  value: number
}

export type TotalStatus = TotalStateItem[]

export interface SelectItem {
  title: string
  name: string
}

export interface QueryParamsItem {
  type: 'input' | 'select' | 'rangePicker' | 'inputNumber' | 'inputNumber-price' // TODO 待完善
  title: string
  name: string
  value: any
  selectGroup?: SelectItem[] // 只有 type 是 'select' 才会有的选项
  max?: number // 只有 type 是 'inputNumber' 才会有的选项
  min?: number // 只有 type 是 'inputNumber' 才会有的选项
  step?: number // 只有 type 是 'inputNumber' 才会有的选项
}
export type QueryParams = QueryParamsItem[]

export interface QueryState {
  dispatch: () => void
  loading: {
    global: boolean
  }
  query: {
    TotalStatus
    QueryParams
    get: (name: string) => void
  }
}

export interface DataItemType {
  name: string
  age: number
  address: string
  children?: DataItemType[]
}

export interface ResType {
  type: string
  data: any
  msg: string
  subMsg?: string
  status?: number
  version?: string
}

// query 参数对象 类型描述
export interface QueryType {
  id?: string
  status?: string
  [propName: string]: any
}

export interface SetQuery {
  payload: {
    type: 'update' | 'remove' | 'reset'
    value?: QueryType | string
  }
}

export interface Pagination {
  total?: number // 0
  current: number // 1
  pageSize: number // 10
}

export interface SetPagination {
  payload: {
    type: 'update' | 'reset'
    pagination: Pagination
  }
}

export interface SetOrders {
  payload: {
    orders: {
      type: 'desc' | 'asc'
    }
  }
}

export interface ServiceParams {
  type?: 0 | 1 // 0就是分页参数生效, 为1分页参数不生效
  orders?: {
    name: 'orders'
    type: 'desc' | 'asc'
  }
  pagination?: Pagination
  query: QueryType
}

export interface QueryInitState extends ServiceParams {
  totalStatus: TotalStateItem[]
  queryTags: TotalStateItem[]
  queryParams: QueryParamsItem[]
  data: any
  statusActive: string
}

export interface QueryServicePayload {
  payload: {
    query: ServiceParams
  }
}

export interface DeletePayload {
  payload: {
    id: string
  }
}

export interface UpdateParams {
  id: string
  [propName: string]: any
}

export interface UpdatePayload {
  payload: {
    params: UpdateParams
  }
}

// 设置 tags 用
// QueryTags 删除使用时, 只需 name
export interface QueryTags {
  name: string
  title?: string
  value?: string
}

export interface SetQueryTags {
  payload: {
    type: 'update' | 'remove'
    value: QueryTags
  }
}

export interface ImmutableMap<T, R = T> {
  get<K extends keyof T>(name: K): T[K]
  set(key: string, value: any): ImmutableMap<T, R>
  setIn(keyPath: string[], value: any): ImmutableMap<T, R>
  getIn<K extends keyof T>(keyPath: string[]): T[K]
  deleteIn(keyPath: string[]): ImmutableMap<T, R>
  toJS(): R
}

export interface IQueryInitState extends Map<string, any> {
  toJS(): QueryInitState
  get<K extends keyof QueryInitState>(key: K): QueryInitState[K]
}
