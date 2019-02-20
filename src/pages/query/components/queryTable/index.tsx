import React from 'react'
import { Table, Button } from 'antd'
import _ from 'lodash'
import styled from 'styled-components'

import { List, is } from 'immutable'
import { DataItemType, UpdateParams } from '../../types'
import { MOCK_OP_ID, MOCK_OP_DELETE } from '../../config'

const TableBox = styled.div`
  border-top: 1px solid rgba(204, 204, 204, 1);
  background-color: #fff;
`

interface IProps extends Props {
  data: List<DataItemType>
  handleRemove: (id: string) => void // 回调: 删除
  handleUpdate: (params: UpdateParams) => void // 回调: 更新
}
interface IState {
  data: List<DataItemType>
}

export default class QueryTable extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (!is(prevState.data, nextProps.data)) {
      return {
        data: nextProps.data,
      }
    }
    return null
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      data: List<DataItemType>(),
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
      },
    ]

    // rowSelection objects indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      },
    }

    const tableData = this.state.data.toJS()

    return (
      <TableBox>
        {/* 测试用: 删除功能 */}
        <div style={{ padding: '2rem 0' }}>
          <Button
            style={{ marginRight: '2rem' }}
            type="primary"
            onClick={() => this.props.handleRemove(MOCK_OP_ID)}
          >
            {' '}
            删除功能 (临时 接口测试用){' '}
          </Button>

          <Button
            style={{ marginRight: '2rem' }}
            type="primary"
            onClick={() => this.props.handleUpdate(MOCK_OP_DELETE)}
          >
            {' '}
            更新功能 (临时 接口测试用){' '}
          </Button>
        </div>

        <Table
          loading={this.props.loading}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={tableData}
        />
      </TableBox>
    )
  }
}
