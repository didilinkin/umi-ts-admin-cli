/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-02-11 21:36:48
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-02-12 17:39:24
 * @Description:
 */
import React from 'react'
import router from 'umi/router'
import { Button } from 'antd'

export default () => (
  <>
    <h1>Dashboard Analysis Page</h1>
    <Button
      type="primary"
      onClick={() => {
        router.goBack()
      }}
    >
      Back
    </Button>
  </>
)
