import React, { PureComponent } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Immutable, { List, Map, is } from 'immutable'
import {
  Form,
  Alert,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select,
  Menu,
  message,
  Card,
  Dropdown,
  Modal,
  DatePicker,
  Tag,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import UpdateForm from './UpdateForm'
import SetAdvancedInput from './SetAdvancedInput'
import BatchOp from './BatchOp'
import styles from './style.less'
import { TotalStateItem, QueryParamsItem } from '../../types'

const FormItem = Form.Item
const { Option } = Select
const { MonthPicker, RangePicker, WeekPicker } = DatePicker

const CreateForm = Form.create()((props: any) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      form.resetFields()
      handleAdd(fieldsValue)
    })
  }
  return (
    <Modal
      destroyOnClose={true}
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})

const QueryTagsBox = styled.div`
  padding: 1rem;
  background-color: #fff;
  > span,
  .ant-tag {
    margin-right: 1rem;
  }
`

interface IFormProps extends FormComponentProps {
  dispatch: (param: any) => void
  loading: boolean
  queryParams: List<QueryParamsItem>
  form: any
  query?: any
  queryTags: List<QueryParamsItem>
}

interface IFormState {
  modalVisible: boolean
  updateModalVisible: boolean
  expandForm: boolean
  selectedRows: any[]
  formValues: any // values
  stepFormValues: object
  // props => state
  queryParams: List<QueryParamsItem>
  renderLoading: boolean
}

class QueryForm extends PureComponent<IFormProps, IFormState> {
  static getDerivedStateFromProps(nextProps: IFormProps, prevState: IFormState) {
    if (!is(prevState.queryParams, nextProps.queryParams)) {
      return {
        queryParams: nextProps.queryParams,
      }
    }
    return null
  }

  constructor(props: IFormProps) {
    super(props)
    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
      queryParams: List<QueryParamsItem>(),
      renderLoading: true,
    }
  }

  // shouldComponentUpdate(nextProps: IFormProps, nextState: IFormState): boolean {
  //   if (nextState.queryParams.size > 0 && !!nextState.renderLoading) {
  //     this.setState(
  //       {
  //         queryParams: nextProps.queryParams,
  //         renderLoading: false,
  //       },
  //       () => console.log('query-shouldComponentUpdate: 更新 queryParams')
  //     )
  //   }
  //   // return nextState.queryParams.size > 0 && !!nextState.renderLoading
  //   // 因为本组件体积较大, 不适合阻止 render 渲染 (比如 控件改变等功能)
  //   return true
  // }

  // 渲染 简单表单
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    const status: any = this.state.queryParams.find((item: any) => item.get('name') === 'status')
    const statusList = !!status ? _.uniqBy(status.get('selectGroup').toJS(), 'name') : []
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('name')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status', {})(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {!!status ? (
                    statusList.map((item: TotalStateItem) => (
                      <Option key={`${item.name}`} value={item.title}>
                        {item.title}
                      </Option>
                    ))
                  ) : (
                    <Option disabled={true} key="total" value="总量">
                      状态错误
                    </Option>
                  )}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>

              {/* TODO: '新建' 后有可能加入 多功能键 */}
              <Button
                icon="plus"
                type="primary"
                style={{ marginLeft: 16 }}
                onClick={() => this.handleModalVisible(true)}
              >
                新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  // 搜索
  handleSearch = (e: any) => {
    e.preventDefault()
    const { dispatch, form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      }
      // TODO
      this.setState({
        formValues: values,
      })
      this.props.dispatch({
        type: 'query/fetch', // 请求
        payload: values,
      })
    })
  }

  // 重置
  handleFormReset = () => {
    const { form, dispatch } = this.props
    form.resetFields()
    this.setState({
      formValues: {},
    })
    dispatch({
      type: 'query/fetch',
      payload: {},
    })
  }

  // 开启/关闭 表单
  toggleForm = () => {
    const { expandForm } = this.state
    this.setState({
      expandForm: !expandForm,
    })
  }

  // 改变 modal 显隐
  handleModalVisible = (flag?: any) => {
    this.setState({
      modalVisible: !!flag,
    })
  }

  // 触发 菜单 点击
  handleMenuClick = (e: any) => {
    const { dispatch } = this.props
    const { selectedRows } = this.state

    if (!selectedRows) {
      return
    }
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'query/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            })
          },
        })
        break
      default:
        break
    }
  }

  // 新增
  handleAdd = (fields: any) => {
    const { dispatch } = this.props
    dispatch({
      type: 'query/add',
      payload: {
        desc: fields.desc,
      },
    })
    message.success('添加成功')
    this.handleModalVisible()
  }

  // 更新 modal 显隐
  handleUpdateModalVisible = (flag?: any, record?: any) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    })
  }

  // 更新
  handleUpdate = (fields: any) => {
    const { dispatch } = this.props
    dispatch({
      type: 'query/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    })
    message.success('配置成功')
    this.handleUpdateModalVisible()
  }

  // AdvancedForm - DatePicker 回调
  AdvancedFormCbFunc = (params: any) => {
    // console.log('AdvancedFormDatePicker: date ===> ', date)
    // console.log('AdvancedFormDatePicker: dateString ===> ', dateString)

    // 测试 日期选择器的回调
    console.log('AdvancedFormCbFunc: params ===> ', params)
  }

  // 渲染高级 表单
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    const queryParams = this.state.queryParams.toJS()
    const status: any = this.state.queryParams.find((item: any) => item.get('name') === 'status')
    const statusList = !!status ? _.uniqBy(status.get('selectGroup').toJS(), 'name') : []
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('name')(<Input placeholder="请输入 ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status', {})(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {!!status ? (
                    statusList.map((item: TotalStateItem) => (
                      <Option key={`${item.name}`} value={item.title}>
                        {item.title}
                      </Option>
                    ))
                  ) : (
                    <Option disabled={true} key="total" value="总量">
                      状态错误
                    </Option>
                  )}
                </Select>
              )}
            </FormItem>
          </Col>
          {/*
            <Col md={8} sm={24}>
              <FormItem label="调用次数">
                {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          */}

          {/* TODO: '新建' 后有可能加入 多功能键 */}
          <Col md={8} sm={24}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
          </Col>
        </Row>

        {/* 配置 支持自定义的 参数功能 */}
        {SetAdvancedInput({
          queryParams: _.filter(
            queryParams,
            (item: QueryParamsItem) => item.name !== 'id' && item.name !== 'status'
          ),
          getFieldDecorator,
          cbFunc: this.AdvancedFormCbFunc,
        })}

        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    )
  }

  renderForm() {
    const { expandForm } = this.state
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }

  closeTag = (e?: any, tagName?: string): void => {
    console.log('关闭 tag: ===> ', tagName)
  }

  render() {
    const { loading, queryTags } = this.props
    // debugger
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    )

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    }
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    }
    return (
      <>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
          </div>
        </Card>

        <QueryTagsBox>
          <span>检索项: </span>
          <>
            {queryTags.map((item: any) => (
              <Tag
                key={item.get('name')}
                closable={true}
                color="#108ee9"
                onClose={e => this.closeTag(e, item.get('name'))}
              >
                {`${item.get('title')}: ${item.get('value')}`}
              </Tag>
            ))}
          </>
        </QueryTagsBox>

        <BatchOp styles={styles} handleMenuClick={this.handleMenuClick} />

        {/* 新建 modal */}
        <CreateForm {...parentMethods} modalVisible={modalVisible} />

        {/* 列表配置 => '更新配置' 触发的 '步骤功能'; TODO: 暂不需要 */}
        {/*
          {stepFormValues && Object.keys(stepFormValues).length ? (
            <UpdateForm
              {...updateMethods}
              updateModalVisible={updateModalVisible}
              values={stepFormValues}
            />
          ) : null}
        */}
      </>
    )
  }
}

export default Form.create()(QueryForm)
