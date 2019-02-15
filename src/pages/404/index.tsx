import React from 'react'
import { formatMessage } from 'umi-plugin-react/locale'
import Link from 'umi/link'
import DocumentTitle from 'react-document-title'
import { Exception } from 'ant-design-pro'

const PAGE_NAME_UPPER_CAMEL_CASE = () => (
  // <Exception
  //   type="404"
  //   desc={formatMessage({ id: '抱歉，你访问的页面不存在' })}
  //   linkElement={Link}
  //   backText={formatMessage({ id: '返回首页' })}
  // />
  <DocumentTitle title="404">
    <>
      <h1>404</h1>
      <p>抱歉，你访问的页面不存在</p>
    </>
  </DocumentTitle>
)

export default PAGE_NAME_UPPER_CAMEL_CASE
