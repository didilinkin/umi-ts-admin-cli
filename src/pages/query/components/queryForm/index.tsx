import React, { PureComponent } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import {
  Form,
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
  InputNumber,
  DatePicker,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import UpdateForm from './UpdateForm'
import styles from './style.less'

const FormItem = Form.Item
const { Option } = Select

const CreateForm = Form.create()((props: any) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) { return }
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

interface IFormProps extends FormComponentProps {
  dispatch: (param: any) => void,
  loading: boolean,
  queryParams: {
    toJS: () => void,
  },
  form: any,
  query?: any, // ?
}

interface IFormState {
  modalVisible: boolean,
  updateModalVisible: boolean,
  expandForm: boolean,
  selectedRows: any[],
  formValues: any, // values
  stepFormValues: object,
}

// handleSearch                 1. 搜索 - 1
// handleFormReset              2. 重置表单 - 1
// toggleForm                   3. 表单开关 - 1
// render                       4. 渲染
// handleMenuClick              5. 菜单点击 - 1
// handleAdd                    6. 添加 - 1
// handleModalVisible           7. 改变 modal 显隐 - 1
// handleUpdateModalVisible     8. 更新 modal 显隐 - 1
// handleUpdate                 9. 更新 - 1
// renderForm                   10. 渲染 form表单
// renderAdvancedForm           11. 渲染高级 表单

class QueryForm extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props)
    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
    }
  }
  // 渲染 简单表单
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
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
      if (err) { return }
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

    if (!selectedRows) { return }
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

  // 渲染高级 表单
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
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

  render() {
    const { getFieldDecorator } = this.props.form
    const queryParams = this.props.queryParams.toJS()
    const {
      // query: { data },
      loading,
    } = this.props
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
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>

            {/* 提示信息 */}
            {/* <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            /> */}
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length
          ? (
            <UpdateForm
              {...updateMethods}
              updateModalVisible={updateModalVisible}
              values={stepFormValues}
            />
          )
          : null}
      </>
    )
  }
}

export default Form.create()(QueryForm)
