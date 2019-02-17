import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import get from 'lodash/get'

import { TotalStatus, TotalStateItem } from '../../types'

interface IProps {
  dispatch: () => void
  loading: boolean
  totalStatus: TotalStatus
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
  render() {
    const totalStatus = get(this.props, 'totalStatus').toJS()
    return (
      <QueryDataBox>
        {totalStatus.map((item: TotalStateItem) => (
          <div className="cursor" key={item.name}>
            <div>
              <p className="title">{item.title}</p>
              <p className="value">{item.value}</p>
            </div>
          </div>
        ))}
      </QueryDataBox>
    )
  }
}
