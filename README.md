# umi-ts-admin
> Admin 后台管理系统, 将支持 SAAS 系统
>
> 支持 区块功能 (需要配置 menu)

## 预览项目

```bash
# 全局安装 umi 工具 (方便安装 block区块 功能)
yarn global add umi # or npm install -g umi

# 安装依赖
yarn install

# 预览
yarn start
```

## 打包项目

```bash
# 打包完成的 文件在 ./dist 文件夹内
yarn build
```

## 相关文档
* [immutable 相关文档](./docs/immutable.md)

## 开发环境
```bash
# 编辑器
vscode

# node -v
v10.7.0

# yarn -v
v1.10.1
```


## TODO list
* package.json 配置 - success
* Prettier 配置 - success 目前是 手动格式化
* TSLint 配置 - success
* 依赖安装 - success
* Nav 配置 - success
* 强检查 配置 - success
* 404 基础页面 - success
* 动态 title 功能 (react-document-title) - 基础功能 (展示 path部分) - success
* git hook 配置 - success
* 动态 title 功能 (react-document-title) - name 匹配功能 (如 中文名称, 也要支持 国际化) - success
* Typescript 文件 暂时无法使用 jest 测试用例, 需要在官方实例中测试
* 部分组件没有改为 .tsx 格式, 需要跟进修改 (3个模块)
* 通过命令行添加 block后, block 自动添加
* style lint 功能
* 国际化部分
* 404 页面具体配置
* umi block 更改 config 到 业务模块内, 修改调用方式

## 关于 格式化 (ESLint + TSLint + Prettier) [说明文档](./docs/format.md)

## 功能计划表
* 前端布局实现 (导航栏、顶部菜单、左侧菜单栏等基础布局) - done
* 代码检测实现 - done
* 项目目录结构规范化实现及说明 - done
* Reactjs 性能优化及最佳实践实现
* 报错异常前后端标准化实现 - 待检测
* 查询页面标准化组件实现 - done
* 树形组件标准化实现
* 用户-角色-权限前端标准化实现及优化
* 权限前后端配套实现

## FAQ

* 本项目 与 **ant-design-pro** 脚手架 有什么区别?

> immutable & typescript

* 是否支持 **bash** 定制化配置?

> 没空配, 现为最简配置

* **CSS** 预处理方案?

> 未配置, 默认支持 **.less*
>
> 推荐 区块部分样式 使用 **styled-components + polished**

* 可否不使用 **immutable**?

> No

* 可否不使用 **typescript**?

> 可以, 支持渐进式, 使用 **.jsx* 或者 **.jsx* 即可

* **block** 区块 跟 umi官方的区块有什么区别?

> 功能正在 开发测试, 完成后将说明


