/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-02-11 21:41:40
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-02-11 21:59:31
 * @Description:
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, AutoComplete } from 'antd'
import classNames from 'classnames'
import omit from 'lodash/omit'

import styles from './index.less'

export default class HeaderSearch extends PureComponent<any, any> {
  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    defaultActiveFirstOption: PropTypes.bool,
    dataSource: PropTypes.array,
    defaultOpen: PropTypes.bool,
  }

  public timeout: any
  public input: any

  state = {
    searchMode: this.props.defaultOpen,
    value: '',
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.timeout = setTimeout(() => {
        this.props.onPressEnter(this.state.value) // Fix duplicate onPressEnter
      }, 0)
    }
  }
  onChange = value => {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }
  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      if (this.state.searchMode) {
        this.input.focus()
      }
    })
  }
  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    })
  }
  render() {
    const { className, placeholder, ...restProps } = this.props

    // delete restProps.defaultOpen // for rc-select not affected
    const configRestProps = omit(restProps, ['defaultOpen']) // tsx 不允许 直接 delete 操作

    const inputClass = classNames(styles.input, {
      [styles.show]: this.state.searchMode,
    })
    return (
      <span className={classNames(className, styles.headerSearch)} onClick={this.enterSearchMode}>
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...configRestProps}
          className={inputClass}
          value={this.state.value}
          onChange={this.onChange}
        >
          <Input
            placeholder={placeholder}
            ref={node => {
              this.input = node
            }}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    )
  }
}
