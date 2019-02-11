/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-02-11 21:30:10
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-02-11 21:30:31
 * @Description:
 */
import { urlToList } from '../index'

describe('test urlToList', () => {
  it('A path', () => {
    expect(urlToList('/userinfo')).toEqual(['/userinfo'])
  })
  it('Secondary path', () => {
    expect(urlToList('/userinfo/2144')).toEqual(['/userinfo', '/userinfo/2144'])
  })
  it('Three paths', () => {
    expect(urlToList('/userinfo/2144/addr')).toEqual([
      '/userinfo',
      '/userinfo/2144',
      '/userinfo/2144/addr',
    ])
  })
})
