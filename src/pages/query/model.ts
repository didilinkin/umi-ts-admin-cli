import { fromJS, Map } from 'immutable'
import _ from 'lodash'

import { TotalStatus, QueryParams, SetQuery, QueryParamsItem } from './types'
import { BLOCK_PATH } from './config'
import checkResCode from './utils/checkResCode'
import * as queryServices from './service'

interface QueryState extends StoreType {
  query: Map<string, any>
}
interface StatusActive {
  payload: {
    statusActive: string
  }
}

const SET_TOTAL_STATUS = 'SET_TOTAL_STATUS'
const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS'
const SET_QUERY_DATA = 'SET_QUERY_DATA'
const UPDATE_QUERY = 'UPDATE_QUERY'
const UPDATE_QUERY_TAGS = 'UPDATE_QUERY_TAGS'
const SET_STATUS_ACTIVE = 'SET_STATUS_ACTIVE'

const initState = fromJS({
  query: {},
  totalStatus: [{ title: '总量', name: 'total', value: 0 }],
  queryParams: [
    {
      title: '编号',
      type: 'input',
      name: 'id',
      value: '1',
    },
  ],
  queryTags: [{ title: '状态', name: 'status', value: 'wait' }],
  data: [],
  statusActive: '',
})

export default {
  namespace: 'query',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(
        ({ pathname }: History): void => {
          if (pathname === BLOCK_PATH) {
            dispatch({ type: 'init' })
          }
        }
      )
    },
  },

  effects: {
    // atom: 获取 全部状态
    *getTotalStatus({ payload }, { call, put }: DvaApi) {
      let totalStatus: TotalStatus = [{ title: '总量', name: 'total', value: 0 }]
      try {
        const totalStatusRes = yield call(queryServices.getTotalStatus, { ...payload.query })
        if (checkResCode(totalStatusRes)) {
          totalStatus = _.cloneDeep(_.get(totalStatusRes, 'data.totalStatus'))
        }
      } catch (e) {
        console.log('query/getTotalStatus 出错', e)
      } finally {
        yield put({ type: SET_TOTAL_STATUS, payload: { totalStatus } })
      }
    },

    // atom: 更新 表格数据
    *getQueryData({ payload }, { call, put }: DvaApi) {
      let data = [
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ]
      try {
        const dataRes = yield call(queryServices.getQueryData, { ...payload.query })
        if (checkResCode(dataRes)) {
          data = _.cloneDeep(_.get(dataRes, 'data.data'))
        }
      } catch (e) {
        console.log('query/getQueryData 出错', e)
      } finally {
        yield put({ type: SET_QUERY_DATA, payload: { data } })
      }
    },

    // 初始化
    *init(__: void, { call, put, select }: DvaApi) {
      console.time('query/init')
      const query = yield select((state: QueryState): any => state.query.get('query').toJS())
      let queryParams: QueryParams = [
        {
          title: '编号',
          type: 'input',
          name: 'id',
          value: '1',
        },
      ]
      try {
        const queryParamsRes = yield call(queryServices.getQueryParams)
        if (checkResCode(queryParamsRes)) {
          queryParams = _.cloneDeep(_.get(queryParamsRes, 'data.queryParams'))
        }
      } catch (e) {
        console.log('query/init 出错 ===> ', e)
      } finally {
        yield put({ type: SET_QUERY_PARAMS, payload: { queryParams } })
        yield put({ type: 'getTotalStatus', payload: { query } })
        yield put({ type: 'getQueryData', payload: { query } })
      }
    },

    *setQuery({ payload }: SetQuery, { put, select }: DvaApi) {
      let query = yield select((state: QueryState): any => state.query.get('query').toJS())
      query = _.assign({}, query, payload)
      yield put({ type: 'getTotalStatus', payload: { query } })
      yield put({ type: 'getQueryData', payload: { query } })
      yield put({ type: UPDATE_QUERY, payload: { query } })
      yield put({ type: 'setQueryTags', payload: { query } })
    },

    // 去重, 以前面的为准
    *setQueryTags({ payload }: SetQuery, { put }: DvaApi) {
      const queryTags = [{ title: '编号', name: 'id', value: '007' }]
      _.forIn(payload.query, (value: QueryParamsItem, key: string) => queryTags.push(value))
      yield put({
        type: UPDATE_QUERY_TAGS,
        payload: {
          queryTags: _.reverse(_.uniqBy(_.reverse(queryTags), 'name')),
        },
      })
    },

    *setStatusActive({ payload }: StatusActive, { put }: DvaApi) {
      yield put({
        type: SET_STATUS_ACTIVE,
        payload: {
          statusActive: payload.statusActive,
        },
      })
    },

    *resetQuery(__: void, { put }: DvaApi) {
      // 重置操作
      // 清理 active
    },

    *fetch(payload: any, { call }: DvaApi) {
      console.log('query/fetch payload ===> ', payload)
    },

    *add(payload: any, { call }: DvaApi) {
      console.log('query/add payload ===> ', payload)
      console.log('新增操作')
    },

    *remove(payload: any, { call }: DvaApi) {
      console.log('query/remove payload ===> ', payload)
      console.log('删除操作')
    },

    *update(payload: any, { call }: DvaApi) {
      console.log('query/update payload ===> ', payload)
      console.log('更新操作')
    },

    *setParams(payload: any, { call }: DvaApi) {
      console.log('query/setParams payload ===> ', payload)
      console.log('配置参数')
    },

    // 批量操作
    *handleBatchOp(payload: any, { call, put }: DvaApi) {
      console.log('query/handleBatchOp payload ===> ', payload)
      console.log('设置批量操作')
    },
  },

  reducers: {
    SET_TOTAL_STATUS(state: any, { payload }) {
      return state.set('totalStatus', fromJS(payload.totalStatus))
    },

    SET_QUERY_PARAMS(state: any, { payload }) {
      return state.set('queryParams', fromJS(payload.queryParams))
    },

    SET_QUERY_DATA(state: any, { payload }) {
      return state.set('data', fromJS(payload.data))
    },

    UPDATE_QUERY(state: any, { payload }) {
      return state.set('query', fromJS(payload.query))
    },

    UPDATE_QUERY_TAGS(state: any, { payload }) {
      return state.set('queryTags', fromJS(payload.queryTags))
    },

    SET_STATUS_ACTIVE(state: any, { payload }) {
      return state.set('statusActive', fromJS(payload.statusActive))
    },
  },
}
