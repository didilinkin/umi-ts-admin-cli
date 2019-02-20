/*
 * @Author: yanxiaodi 929213769@qq.com
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @Description: params 不做操作, 直传
 * @Date: 2019-02-16 14:10:01
 * @LastEditTime: 2019-02-20 21:13:55
 */
import request from 'umi-request'

import {
  BLOCK_PATH,
  BLOCK_API_VERSION,
  API_GET_TOTAL_STATUS,
  API_GET_QUERY_DATA,
  API_GET_QUERY_PARAMS,
  API_POST_QUERY,
  API_PUT_QUERY,
  API_DELETE_QUERY,
} from './config'
const API_HEAD = `/api${BLOCK_PATH}${BLOCK_API_VERSION}`

export async function getQueryParams(): Promise<any> {
  return request(`${API_HEAD}${API_GET_QUERY_PARAMS}`, {
    method: 'GET',
  })
}

export async function getTotalStatus(params?: any): Promise<any> {
  console.log('service-query-获取 全部状态数据: param ===> ', params)
  return request(`${API_HEAD}${API_GET_TOTAL_STATUS}`, {
    method: 'GET',
    params,
  })
}

export async function getQueryData(params?: any): Promise<any> {
  console.log('service-query-获取 表格数据: param ===> ', params)
  return request(`${API_HEAD}${API_GET_QUERY_DATA}`, {
    method: 'GET',
    params,
  })
}

export async function postQuery(data?: any): Promise<any> {
  console.log('service-query-新增创建: data ===> ', data)
  return request(`${API_HEAD}${API_POST_QUERY}`, {
    method: 'POST',
    data,
  })
}

export async function putQuery(data?: any): Promise<any> {
  console.log('service-query-更新: data ===> ', data)
  return request(`${API_HEAD}${API_PUT_QUERY}/${data.id}`, {
    method: 'PUT',
    data,
  })
}

export async function deleteQuery(id?: string): Promise<any> {
  console.log('service-query-删除: id ===> ', id)
  return request(`${API_HEAD}${API_DELETE_QUERY}/${id}`, {
    method: 'DELETE',
  })
}
