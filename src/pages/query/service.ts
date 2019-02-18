import request from 'umi-request'
import qs from 'qs'

import {
  BLOCK_PATH,
  BLOCK_API_VERSION,
  API_GET_TOTAL_STATUS,
  API_GET_QUERY_DATA,
  API_GET_QUERY_PARAMS,
} from './config'
const API_HEAD = `/api${BLOCK_PATH}${BLOCK_API_VERSION}`

export async function getQueryParams(): Promise<any> {
  return request(`${API_HEAD}${API_GET_QUERY_PARAMS}`)
}

export async function getTotalStatus(params?: any): Promise<any> {
  console.log(
    'service-query-获取 全部状态数据: param ===> ',
    // qs.stringify(params),
    params
  )
  return request(`${API_HEAD}${API_GET_TOTAL_STATUS}`, {
    params,
  })
}

export async function getQueryData(params?: any): Promise<any> {
  console.log('service-query-获取 表格数据: param ===> ', params)
  return request(`${API_HEAD}${API_GET_QUERY_DATA}`, {
    params,
  })
}
