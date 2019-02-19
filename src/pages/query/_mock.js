import setResData from './utils/setResData'
import {
  BLOCK_PATH,
  BLOCK_API_VERSION,
  API_GET_TOTAL_STATUS,
  API_GET_QUERY_DATA,
  API_GET_QUERY_PARAMS,
} from './config'

const DELAY_TIME = 1000
const API_HEAD = `/api${BLOCK_PATH}${BLOCK_API_VERSION}`

const getTotalStatus = `GET ${API_HEAD}${API_GET_TOTAL_STATUS}`
const getQueryData = `GET ${API_HEAD}${API_GET_QUERY_DATA}`
const getQueryParams = `GET ${API_HEAD}${API_GET_QUERY_PARAMS}`

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': (req, res) => {
    setTimeout(() => {
      res.send({
        users: [1, 2],
      })
    }, 2000)
  },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    res.end('OK')
  },

  // query - 请求 全部状态
  [getTotalStatus]: (req, res) => {
    setTimeout(() => {
      res.send(
        setResData({
          type: 'success',
          msg: 'success',
          subMsg: '',
          version: BLOCK_API_VERSION,
          data: {
            totalStatus: [
              { title: '等待', name: 'wait', value: 3 },
              { title: '进行', name: 'processing', value: 5 },
              { title: '完成', name: 'success', value: 6 },
              { title: '失败', name: 'failure', value: 4 },
              { title: '告警', name: 'alarm', value: 2 },
              { title: '总量', name: 'total', value: 20 },
            ],
          },
        })
      )
    }, DELAY_TIME)
  },

  [getQueryData]: (req, res) => {
    setTimeout(() => {
      res.send(
        // error
        // setResData({
        //   type: 'error',
        //   msg: '数据查询异常，请检查参数',
        //   subMsg: `Unknown column 'string' in 'order clause'`,
        //   data: [],
        //   version: BLOCK_API_VERSION,
        // })

        // success
        setResData({
          type: 'success',
          msg: 'success',
          subMsg: '',
          version: BLOCK_API_VERSION,
          data: {
            data: [
              {
                key: 1,
                name: 'John Brown sr.',
                age: 60,
                address: 'New York No. 1 Lake Park',
                children: [
                  {
                    key: 11,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                  },
                  {
                    key: 12,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [
                      {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                      },
                    ],
                  },
                  {
                    key: 13,
                    name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                    children: [
                      {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                          {
                            key: 1311,
                            name: 'Jim Green jr.',
                            age: 25,
                            address: 'London No. 3 Lake Park',
                          },
                          {
                            key: 1312,
                            name: 'Jimmy Green sr.',
                            age: 18,
                            address: 'London No. 4 Lake Park',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                key: 2,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
              },
            ],
          },
        })
      )
    }, DELAY_TIME)
  },

  [getQueryParams]: (req, res) => {
    setTimeout(() => {
      res.send(
        setResData({
          type: 'success',
          msg: 'success',
          subMsg: '',
          version: BLOCK_API_VERSION,
          data: {
            queryParams: [
              // 全部可用的 检索项目
              {
                title: '编号',
                type: 'input',
                name: 'id',
                value: '1',
              },
              {
                title: '状态',
                type: 'select',
                name: 'status',
                value: 'wait',
                selectGroup: [
                  { title: '等待', name: 'wait' },
                  { title: '进行', name: 'processing' },
                  { title: '完成', name: 'success' },
                  { title: '失败', name: 'failure' },
                  { title: '告警', name: 'alarm' },
                  { title: '总量', name: 'total' },
                ],
              },
              {
                title: '更新日期',
                type: 'rangePicker',
                name: 'date', // 'RangePicker', 'DatePicker', 'MonthPicker', 'WeekPicker' 等..
                value: [1550125191],
              },
              {
                title: '调用次数',
                type: 'inputNumber', // TODO: 约束只允许输入 number
                name: 'count',
                value: 1,
                max: 99999,
                min: 1,
                step: 1,
              },
              {
                title: '操作人',
                type: 'select',
                name: 'op',
                value: 'wait',
                selectGroup: [
                  { title: '运维', name: 'OM' },
                  { title: '后端', name: 'BE' },
                  { title: '前端', name: 'FE' },
                  { title: '测试', name: 'TE' },
                ],
              },
              {
                title: '价格',
                type: 'inputNumber-price',
                name: 'inputNumber-price',
                value: '30000',
                max: 99999,
                mim: 1,
                step: 0.1,
              },
            ],
          },
        })
      )
    })
  },
}
