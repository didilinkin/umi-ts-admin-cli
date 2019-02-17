import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'
import get from 'lodash/get'
import pick from 'lodash/pick'

import QueryData from './components/queryData'
import QueryForm from './components/queryForm'
import QueryTable from './components/queryTable'

// types
import { QueryState, TotalStatus, QueryParams, DataItemType } from './types'
import { List } from 'immutable'

// utils
import setChildProps from './utils/setChildProps'

interface IProps {
  dispatch: () => void
  loading: boolean
  totalStatus: List<TotalStatus> // Immutable
  queryParams: List<QueryParams> // Immutable
  data: List<DataItemType> // Immutable
}

interface IState {
  visible: boolean
  modalType: 'create' | 'update'
}

@connect((state: QueryState) => ({
  dispatch: state.dispatch,
  loading: state.loading.global,
  totalStatus: state.query.get('totalStatus'),
  queryParams: state.query.get('queryParams'),
  data: state.query.get('data'),
}))
export default class Query extends React.Component<IProps, IState> {
  render() {
    return (
      <DocumentTitle title="查询页面">
        <>
          {/* 状态数据展示 */}
          <QueryData {...pick(this.props, setChildProps(['totalStatus']))} />

          {/* 搜索项 */}
          <QueryForm {...pick(this.props, setChildProps(['queryParams', 'totalStatus']))} />

          {/* 表格部分 */}
          <QueryTable {...pick(this.props, setChildProps(['data']))} />
        </>
      </DocumentTitle>
    )
  }
}
