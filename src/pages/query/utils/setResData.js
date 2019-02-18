// 参考文档
// https://github.com/f2e-journey/treasure/blob/master/api.md
// https://yq.aliyun.com/articles/283282#3

/**
 * 设置 mock 返回值方法
 * @param {string} type             // 执行结果 状态 ‘success’ | 'error'
 * @param {any} data                // res.data
 * @param {string} version          // API 版本
 * @param {string} msg              // 对用户反馈信息
 * @param {string} subMsg           // 对开发者反馈信息
 * @param {number} status           // 状态码
 */

// a00d2315-3b83-48c7-9cf1-a8963d1a69cc

// error 错误 类型
// {
//   "status": 6000,
//   "subMsg": "Unknown column 'string' in 'order clause'",
//   "msg": "数据查询异常，请检查参数"
// }

export default ({
  type,
  data,
  version = 'v1',
  msg,
  subMsg = '',
  status = 200,
}) => {
  switch (type) {
    case 'success':
      return {
        status,
        data,
        msg,
        subMsg,
        version,
      }

    default:
      break
  }
}
