import { fromJS } from 'immutable'
import _ from 'lodash'

const initState = fromJS({
  visible: false,
  modalType: '', // 'create', 'update', 'edit'
  totalStatus: [
    { title: '等待', name: 'wait', value: 3 },
    { title: '进行', name: 'processing', value: 5 },
    { title: '完成', name: 'success', value: 6 },
    { title: '失败', name: 'failure', value: 4 },
    { title: '告警', name: 'alarm', value: 2 },
    { title: '总量', name: 'total', value: 20 },
  ],
  queryParams: [
    // 全部可用的 检索项目
    {
      title: '编号',
      name: 'id',
      value: '1',
    },
    {
      title: '更新日期',
      name: 'rangePicker', // 'RangePicker', 'DatePicker', 'MonthPicker', 'WeekPicker' 等..
      value: [1550125191],
    },
    {
      title: '使用状态',
      name: 'status',
      value: ['wait', 'processing', 'success', 'failure', 'alarm'],
    },
    {
      title: '调用次数',
      name: 'count',
      value: 1,
    },
  ],
  queryTabs: ['id', 'status'], // "检索项"
})

export default {
  namespace: 'query',

  state: initState,

  effects: {
    *fetch(payload: any, { call }: DvaApi) {
      console.log('query/fetch payload ===> ', payload)
    },
  },

  reducers: {},
}
