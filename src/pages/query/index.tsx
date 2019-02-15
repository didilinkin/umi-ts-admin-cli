import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'
import get from 'lodash/get'
import pick from 'lodash/pick'

import QueryData from './components/queryData'
import QueryForm from './components/queryForm'
import QueryTable from './components/queryTable'

// types
import {
  QueryState,
  TotalStatus,
  QueryParams,
} from './types'

// utils
import setChildProps from './utils/setChildProps'

interface IProps {
  dispatch: () => void,
  loading: boolean,
  totalStatus: TotalStatus,
  queryParams: QueryParams,
}

interface IState {
  visible: boolean,
}

@connect(
  (state: QueryState) => ({
    dispatch: state.dispatch,
    loading: state.loading.global,
    totalStatus: state.query.get('totalStatus'),
    queryParams: state.query.get('queryParams'),
  })
)
export default class Query extends React.Component<IProps, IState> {
  render () {
    return (
      <DocumentTitle title="查询页面">
        <>
          {/* 状态数据展示 */}
          <QueryData {...pick(this.props, setChildProps(['totalStatus']))} />

          {/* 搜索项 */}
          <QueryForm {...pick(this.props, setChildProps(['queryParams']))} />

          {/* 表格部分 */}
          <QueryTable />
        </>
      </DocumentTitle>
    )
  }
}
