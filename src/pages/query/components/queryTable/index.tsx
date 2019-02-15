import React from 'react'
import { Table } from 'antd'
import _ from 'lodash'
import styled from 'styled-components'

import { List } from 'immutable'
import { DataItemType } from '../../types'

const TableBox = styled.div`
  border-top: 1px solid rgba(204,204,204,1);
  background-color: #FFF;
`

interface IProps extends Props {
  data: List<DataItemType>,
}
interface IState {
  data: DataItemType[],
}

export default class QueryTable extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      data: props.data.toJS(),
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

    return (
      <TableBox>
        <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.data} />
      </TableBox>
    )
  }
}
