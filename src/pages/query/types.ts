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
