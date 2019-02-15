export interface TotalStateItem {
  title: string
  name: string
  value: number
  get: (name: string) => any
}
export type TotalStatus = TotalStateItem[]

export type QueryParams = Array<{
  title: string
  name: string
  value: any
}>

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
