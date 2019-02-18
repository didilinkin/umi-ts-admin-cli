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

export interface SetQuery {
  payload: {
    id?: string
    status?: string
    query?: any
    [propName: string]: any
  }
}

export interface QueryInitState {
  orders: 'desc' | 'asc' //
  pagination: {
    total: number // 0
    current: number // 1
    pageSize: number // 10
  }
  query: {
    status?: string
  }
  totalStatus: TotalStateItem[]
  queryTags: TotalStateItem[]
  queryParams: QueryParamsItem[]
  data: any
  statusActive: string
}

// const params = {
//   orders: {
//     name: 'orders',
//     type: 'desc',
//   },
//   pagination: {
//     current: 1,
//     pageSize: 15,
//   },
//   query: {
//     status: 'success',
//     name: "刘志强",
//   },
// }

export interface QueryServiceParams {
  type: 0 | 1 // 全量查询
  orders: {
    name: 'orders'
    type: 'desc' | 'asc'
  }
  pagination: {
    current: number
    pageSize: number
  }
  query: {
    id?: string
    status?: string
    [propName: string]: any
  }
}
