import React, { Component } from 'react'
import { Layout } from 'antd'
import DocumentTitle from 'react-document-title'

import logo from '../assets/logo.svg'
import { getMenuData } from '../common/menu'
import GlobalHeader from '../components/GlobalHeader'
import SiderMenu from '../components/SiderMenu/SiderMenu'

import get from 'lodash/get'

// 获取路由数据

const { Content, Header } = Layout

class BasicLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    const { children, location } = this.props
    const { collapsed } = this.state
    return (
      // TODO: 根据 path 转换得到 menu中的 name
      <DocumentTitle
        title={
          get(this, 'props.location.pathname') === '/'
            ? 'umi 脚手架'
            : get(this, 'props.location.pathname')
        }
      >
        <Layout>
          <SiderMenu
            logo={logo}
            collapsed={collapsed}
            menuData={getMenuData()}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Header style={{ padding: 0 }}>
              <GlobalHeader
                logo={logo}
                collapsed={collapsed}
                currentUser={{
                  name: 'Serati Ma',
                  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                  userid: '00000001',
                  notifyCount: 12,
                }}
                onCollapse={this.handleMenuCollapse}
              />
            </Header>
            <Content style={{ margin: '24px 24px 0', height: '100%' }}>{children}</Content>
          </Layout>
        </Layout>
      </DocumentTitle>
    )
  }
}

export default BasicLayout
