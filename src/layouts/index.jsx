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
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      hasError: false,
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

    try {
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
              <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                {this.state.hasError ? (
                  // You can render any custom fallback UI
                  <h1> React 错误边界</h1>
                ) : (
                    children
                  )}
              </Content>
            </Layout>
          </Layout>
        </DocumentTitle>
      )
    } catch {
      return (
        <DocumentTitle
          title={
            get(this, 'props.location.pathname') === '/'
              ? 'umi 脚手架'
              : get(this, 'props.location.pathname')
          }
        >
          <h1> try/catch 错误拦截</h1>
        </DocumentTitle>
      )
    }
  }
}

export default BasicLayout
