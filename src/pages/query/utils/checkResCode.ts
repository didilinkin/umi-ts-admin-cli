import { message } from 'antd'
import hasIn from 'lodash/hasIn'

import { ResType } from '../types'
import { RES_STATUS_CODE, RES_MESSAGE } from '../config.js'

export default (res: ResType) => {
  switch (res[RES_STATUS_CODE]) {
    case 200:
      return true

    default:
      if (hasIn(res, RES_MESSAGE)) {
        message.error(res[RES_MESSAGE])
      } else {
        console.log('接口错误: checkResCode ===> ', res)
        message.error('接口错误')
      }
      throw res
  }
}
