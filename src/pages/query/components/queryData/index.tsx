import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'
import { darken } from 'polished'
import get from 'lodash/get'
import assign from 'lodash/assign'

import { TotalStatus, TotalStateItem } from '../../types'

interface IProps extends Props {
  totalStatus: TotalStatus
  statusActive: string
}

const QueryDataBox = styled.div`
  display: flex;
  background-color: rgba(204, 204, 204, 0.176470588235294);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(204, 204, 204, 1);
  border-radius: 4px;
  > div.cursor {
    flex: 1;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: ${darken(0.1, 'rgba(204, 204, 204, 0.176470588235294)')};
    }
    div {
      margin: 0.5rem 0;
      p.title {
        color: #666666;
      }
      p.value {
        margin: 0;
        font-weight: bold;
        color: #0066ff;
      }
    }
  }
`

export default class QueryData extends PureComponent<IProps, {}> {
  handleQueryParam = (item: TotalStateItem): void => {
    this.props.dispatch({
      type: 'query/setQuery',
      payload: {
        type: 'update',
        value: {
          status: item.name, // success
        },
      },
    })
  }

  render() {
    const totalStatus = get(this.props, 'totalStatus').toJS()
    return (
      <Spin spinning={this.props.loading}>
        <QueryDataBox>
          {totalStatus.map((item: TotalStateItem) => (
            <div className="cursor" key={item.name} onClick={() => this.handleQueryParam(item)}>
              <div>
                <p className="title">{item.title}</p>
                <p
                  className="value"
                  style={{ color: this.props.statusActive === item.name ? 'red' : '#0066ff' }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </QueryDataBox>
      </Spin>
    )
  }
}
