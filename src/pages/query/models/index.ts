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
