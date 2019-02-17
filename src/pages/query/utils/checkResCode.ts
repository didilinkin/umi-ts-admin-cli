import { message } from 'antd'
import hasIn from 'lodash/hasIn'

import { ResType } from '../types'

const STATUS_CODE = 'status'
const RES_MESSAGE = 'msg'

export default (res: ResType) => {
  switch (res[STATUS_CODE]) {
    case 200:
      return true

    default:
      if (hasIn(res, RES_MESSAGE)) {
        message.warning(res[RES_MESSAGE])
      } else {
        console.log('接口错误: checkResCode ===> ', res)
        message.error('接口错误')
      }
      return false
  }
}
