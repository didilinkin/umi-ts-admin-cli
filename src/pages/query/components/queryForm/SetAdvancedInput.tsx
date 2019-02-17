// 根据 传入的配置参数, 返回不同的 搜索项目
import React from 'react'
import { Row, Col, Form, DatePicker, Select, Input, InputNumber } from 'antd'
import _ from 'lodash'

import { QueryParamsItem, SelectItem } from '../../types'

const FormItem = Form.Item
const { Option } = Select
const { MonthPicker, RangePicker, WeekPicker } = DatePicker

interface IParams {
  queryParams: QueryParamsItem[]
  getFieldDecorator: (name: string) => any
  cbFunc: (params: any) => void
}

const checkFormItemType = (item: QueryParamsItem, cbFunc: (params: any) => void) => {
  switch (item.type) {
    case 'input':
      return <Input placeholder={`请输入 ${item.title}`} style={{ width: '100%' }} />

    case 'inputNumber':
      return <InputNumber min={item.min} max={item.max} step={item.step} />

    case 'inputNumber-price':
      return (
        <InputNumber
          step={item.step}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => _.toInteger(value.replace(/\$\s?|(,*)/g, ''))}
        />
      )

    case 'select':
      return (
        <Select placeholder={`请选择 ${item.title}`} style={{ width: '100%' }}>
          {!!item.selectGroup && item.selectGroup.length > 0 ? (
            item.selectGroup.map((selectItem: SelectItem) => (
              <Option key={selectItem.name} value={selectItem.title}>
                {selectItem.title}
              </Option>
            ))
          ) : (
            <Option disabled={true} value={`${item.name}-0`}>
              状态错误
            </Option>
          )}
        </Select>
      )

    // TODO 时间选择器 补充不同类型
    case 'rangePicker':
      return <RangePicker style={{ width: '100%' }} onChange={cbFunc} />

    default:
      return ''
  }
}

export default ({ queryParams, getFieldDecorator, cbFunc }: IParams) => {
  const queryParamsList = _.chunk(queryParams, 3)
  return (
    <>
      {queryParamsList.map((itemList: QueryParamsItem[], key: number) => (
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} key={key}>
          {itemList.map((item: QueryParamsItem) => (
            <Col md={8} sm={24} key={item.name}>
              <FormItem label={item.title}>
                {getFieldDecorator(item.name)(checkFormItemType(item, cbFunc))}
              </FormItem>
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}
