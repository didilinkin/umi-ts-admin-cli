import React, { PureComponent } from 'react'
import { Alert, Button, Dropdown, Icon, Menu } from 'antd'
import styled from 'styled-components'

interface IProps {
  styles: any
  handleMenuClick: (e: any) => void
}

export default ({ styles, handleMenuClick }: IProps) => {
  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  )

  return (
    <>
      <Alert
        type="info"
        showIcon={true}
        message={
          <>
            <div className={styles.tableListOperator}>
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            </div>
          </>
        }
      />
    </>
  )
}
