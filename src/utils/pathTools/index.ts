/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-02-11 21:29:22
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-02-11 21:29:42
 * @Description:
 */
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}
