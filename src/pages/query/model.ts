import { fromJS, Map } from 'immutable'
import _ from 'lodash'
import hasIn from 'lodash/hasIn'
import { message } from 'antd'

import {
  TotalStatus,
  QueryParams,
  SetQuery,
  QueryType,
  DeletePayload,
  UpdatePayload,
  QueryTags,
  QueryParamsItem,
  SetPagination,
  SetOrders,
} from './types'
import { BLOCK_PATH, RES_MESSAGE } from './config'
import checkResCode from './utils/checkResCode'
import * as queryServices from './service'

interface QueryState extends StoreType {
  query: Map<string, any>
}

const SET_TOTAL_STATUS = 'SET_TOTAL_STATUS'
const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS'
const SET_QUERY_DATA = 'SET_QUERY_DATA'
const UPDATE_QUERY = 'UPDATE_QUERY'
const UPDATE_QUERY_TAGS = 'UPDATE_QUERY_TAGS'
const SET_STATUS_ACTIVE = 'SET_STATUS_ACTIVE'
const SET_QUERY_PAGINATION = 'SET_QUERY_PAGINATION'
const SET_QUERY_ORDERS = 'SET_QUERY_ORDERS'

const initState = fromJS({
  // 分页类型
  type: 0,

  // 排序. 组件中要加 'end'; 'descend' 降序, 'ascend' 升序
  orders: {
    name: 'orders',
    type: 'desc',
  },

  // 分页参数; 总条数 (总页数由组件计算)
  pagination: {
    total: 0, // res
    current: 1,
    pageSize: 10,
  },
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
  queryTags: [{ title: '状态', name: 'status', value: 'default' }],
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
    // 获取 全部状态, 需要参数: query
    *getTotalStatus(__: void, { call, put, select }: DvaApi) {
      const query = yield select((state: QueryState): any => state.query.get('query').toJS())
      let totalStatus: TotalStatus = [{ title: '总量', name: 'total', value: 0 }]
      try {
        const totalStatusRes = yield call(queryServices.getTotalStatus, { ...query })
        if (checkResCode(totalStatusRes)) {
          totalStatus = _.cloneDeep(_.get(totalStatusRes, 'data.totalStatus'))
        }
      } catch (e) {
        console.log('query/getTotalStatus 出错', e)
      } finally {
        yield put({ type: SET_TOTAL_STATUS, payload: { totalStatus } })
      }
    },

    // 更新 表格数据, 需要参数: type, orders, pagination, query
    *getQueryData(__: void, { call, put, select }: DvaApi) {
      const currentState = yield select((state: QueryState): any => state.query.toJS())
      let data = [
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ]
      try {
        const dataRes = yield call(
          queryServices.getQueryData,
          _.pick(currentState, ['type', 'orders', 'pagination', 'query'])
        )
        if (checkResCode(dataRes)) {
          data = _.cloneDeep(_.get(dataRes, 'data.data'))
        }
      } catch (e) {
        console.log('query/getQueryData 出错', e)
      } finally {
        yield put({ type: SET_QUERY_DATA, payload: { data } })
      }
    },

    *init(__: void, { call, put }: DvaApi) {
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
        yield put({ type: 'getTotalStatus' })
        yield put({ type: 'getQueryData' })
      }
    },

    *setQuery({ payload }: SetQuery, { put, select }: DvaApi) {
      let currentQuery: QueryType = yield select((state: { query: Map<string, any> }) =>
        state.query.get('query').toJS()
      )
      if (payload.type === 'update') {
        currentQuery = _.assign({}, currentQuery, payload.value)
      } else if (payload.type === 'remove') {
        currentQuery = _.omit(currentQuery, payload.value)
      } else if (payload.type === 'reset') {
        currentQuery = {}
      }
      yield put({ type: UPDATE_QUERY, payload: { query: currentQuery } })
      yield put({ type: 'getTotalStatus' })
      yield put({ type: 'getQueryData' })
      yield put({ type: 'setQueryTags' })
      yield put({ type: 'setStatusActive' })
    },

    // 不能保证渲染关系 = query 加入顺序
    *setQueryTags(__: void, { put, select }: DvaApi) {
      const currentQuery: QueryType = yield select((state: { query: Map<string, any> }) =>
        state.query.get('query').toJS()
      )
      const currentQueryParams: QueryParamsItem[] = yield select(
        (state: { query: Map<string, any> }) => state.query.get('queryParams').toJS()
      )
      const queryTags: QueryTags[] = []
      _.forIn(currentQuery, (value: any, key: string) =>
        queryTags.push({
          title: _.get(
            _.find(currentQueryParams, (item: QueryParamsItem) => item.name === key),
            'title'
          ),
          name: key,
          value,
        })
      )
      yield put({
        type: UPDATE_QUERY_TAGS,
        payload: { queryTags },
      })
    },

    *setStatusActive(__: void, { put, select }: DvaApi) {
      const currentQuery: QueryType = yield select((state: { query: Map<string, any> }) =>
        state.query.get('query').toJS()
      )
      let statusActive = ''
      if (hasIn(currentQuery, 'status')) {
        statusActive = currentQuery.status
      }
      yield put({ type: SET_STATUS_ACTIVE, payload: { statusActive } })
    },

    *resetQuery(__: void, { put }: DvaApi) {
      // 重置 分页数据
      // 重置 排序
      // 重置 query 参数
      // 清理 active
      yield put({
        type: 'setPagination',
        payload: {
          pagination: {
            current: 1,
            pageSize: 10,
          },
        },
      })
      yield put({
        type: 'setOrders',
        payload: {
          orders: {
            type: 'desc',
          },
        },
      })
      yield put({
        type: 'setQuery',
        payload: {
          type: 'reset',
        },
      })
      yield put({ type: 'setStatusActive' })
    },

    *setPagination({ payload }: SetPagination, { put }: DvaApi) {
      yield put({
        type: SET_QUERY_PAGINATION,
        payload: { pagination: payload.pagination },
      })
    },

    *setOrders({ payload }: SetOrders, { put }: DvaApi) {
      yield put({
        type: SET_QUERY_ORDERS,
        payload: { orders: payload.orders },
      })
    },

    *fetch(payload: any, { call }: DvaApi) {
      console.log('query/fetch payload ===> ', payload)
    },

    // 因无法确认 新增 结构, 所以使用 any
    *add({ payload }: any, { call, put }: DvaApi) {
      console.log('query/add payload ===> ', payload)
      try {
        const res = yield call(queryServices.postQuery, payload)
        if (checkResCode(res)) {
          if (hasIn(res, RES_MESSAGE)) {
            message.success(res[RES_MESSAGE])
          }
          yield put({ type: 'getTotalStatus' })
          yield put({ type: 'getQueryData' })
        }
      } catch (e) {
        console.log('query/add 出错 ===> ', e)
      }
    },

    *remove({ payload }: DeletePayload, { call, put }: DvaApi) {
      console.log('query/remove payload ===> ', payload)
      try {
        const res = yield call(queryServices.deleteQuery, payload.id)
        if (checkResCode(res)) {
          if (hasIn(res, RES_MESSAGE)) {
            message.success(res[RES_MESSAGE])
          }
          yield put({ type: 'getTotalStatus' })
          yield put({ type: 'getQueryData' })
        }
      } catch (e) {
        console.log('query/delete 出错', e)
      }
    },

    *update({ payload }: UpdatePayload, { call, put }: DvaApi) {
      console.log('query/update payload ===> ', payload.params)
      try {
        const res = yield call(queryServices.putQuery, payload.params)
        if (checkResCode(res)) {
          if (hasIn(res, RES_MESSAGE)) {
            message.success(res[RES_MESSAGE])
          }
          yield put({ type: 'getTotalStatus' })
          yield put({ type: 'getQueryData' })
        }
      } catch (e) {
        console.log('query/update 出错', e)
      }
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

    SET_QUERY_PAGINATION(state: any, { payload }) {
      return state.mergeDeep(fromJS({ pagination: payload.pagination }))
    },

    SET_QUERY_ORDERS(state: any, { payload }) {
      return state.mergeDeep(fromJS({ orders: payload.orders }))
    },
  },
}
