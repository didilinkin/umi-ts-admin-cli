import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'
import pick from 'lodash/pick'

import QueryData from './components/queryData'
import QueryForm from './components/queryForm'
import QueryTable from './components/queryTable'

// types
import {
  QueryState,
  TotalStatus,
  QueryParams,
  DataItemType,
  QueryParamsItem,
  MOCK_OP_DELETE,
} from './config'
import { List } from 'immutable'

// utils
import setChildProps from './utils/setChildProps'

interface IProps extends Props {
  totalStatus: List<TotalStatus>
  queryParams: List<QueryParams>
  data: List<DataItemType>
  queryTags: List<QueryParamsItem>
  statusActive: string
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
  statusActive: state.query.get('statusActive'),
  queryTags: state.query.get('queryTags'),
}))
export default class Query extends React.Component<IProps, IState> {
  handleRemove = (id: string): void => {
    this.props.dispatch({
      type: 'query/remove',
      payload: { id },
    })
  }

  handleUpdate = (params: MOCK_OP_DELETE): void => {
    this.props.dispatch({
      type: 'query/update',
      payload: { params },
    })
  }

  render() {
    return (
      <DocumentTitle title="查询页面">
        <>
          {/* 状态数据展示 */}
          <QueryData {...pick(this.props, setChildProps(['totalStatus', 'statusActive']))} />

          {/* 搜索项 */}
          <QueryForm {...pick(this.props, setChildProps(['queryParams', 'queryTags']))} />

          {/* 表格部分 */}
          {/* 向下传递 cbFunc: 删除,  */}
          <QueryTable
            {...pick(this.props, setChildProps(['data']))}
            handleRemove={this.handleRemove}
            handleUpdate={this.handleUpdate}
          />
        </>
      </DocumentTitle>
    )
  }
}
