// 参考文档
// https://github.com/f2e-journey/treasure/blob/master/api.md
// https://yq.aliyun.com/articles/283282#3
export default ({
  type,
  data,
  version = 'v1',
  msg, // to user
  subMsg = '', // to dev
  status = 200,
}) => {
  switch (type) {
    case 'success':
      return {
        status: 200,
        data,
        msg,
        subMsg,
        version,
      }

    default:
      break
  }
}
