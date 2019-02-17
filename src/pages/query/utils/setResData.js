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
