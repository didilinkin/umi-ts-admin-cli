declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'
declare module '*.svg'
declare const GlobalHeader: any

declare interface DvaApi {
  call: (service: () => Promise<any>, payload?: any) => void
  put: (param: { type: string; payload?: any }) => void
  select: (state: any) => any // getCart = state => state.cart
  cancel: () => void
  take: () => void
}

declare interface Props {
  dispatch: (params: { type: string; payload?: any }) => void
  loading: boolean
}

declare interface History {
  hash: string
  pathname: string
  query: object
  search: string
  [propName: string]: any
}

declare interface StoreType {
  loading: {
    global: boolean
  }
  dispatch: (param: { type: string; payload?: any }) => void
}

declare interface DvaState extends StoreType {
  '@@dva': number
  routing: {
    location: {
      hash: string
      key: string
      pathname: string
      query: any
      search: string
    }
  }
  // model name
  [propName: string]: any
}
