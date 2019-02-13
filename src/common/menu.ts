/*
 * @Author: yanxiaodi 929213769@qq.com
 * @Date: 2019-02-11 21:12:28
 * @LastEditors: yanxiaodi 929213769@qq.com
 * @LastEditTime: 2019-02-13 16:59:41
 * @Description: 菜单
 */
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  return reg.test(path)
}

const menuData = [
  {
    name: '仪表板',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
        children: [
          {
            name: '监控页-1',
            path: 'monitor1',
          },
          {
            name: '监控页-2',
            path: 'monitor2',
          },
        ],
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '分析',
    icon: 'dashboard',
    path: 'analysis',
  },
]

function formatter(data, parentPath = '/', parentAuthority?: any) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
