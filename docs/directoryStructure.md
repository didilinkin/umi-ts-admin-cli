# 规范化 目录结构

```bash
    ├── dist/                       # 编译结果
    ├── docs/                       # 文档目录
    ├── mock/                       # Mock 模拟接口
    ├── src/                        # 源码目录
    │   ├── assets/                 # 静态资源
    │   ├── common/                 # 公共配置
    │       └── menu.ts             # 导航栏
    │   ├── components/             # 公共组件
    │   └── layouts/                # 页面 结构部分
    │       └── index.ts
    │   └── models/                 # 全局 models
    │       └── index.ts            
    │   ├── pages                   # 页面文件目录 (包含 block区块功能)
    │   │   └── index
    │   │       ├── model/          # 业务逻辑 (Dva model)
    │   │       ├── index.tsx       # 页面逻辑
    │   │       └── index.less      # 页面样式
    │   ├── services/               # 全局模块请求
    │   ├── utils/                  # 常用工具类
    │   ├── app.ts                  # 入口文件
    │   └── global.css              # 全局 样式
    ├── .editorconfig               # 编辑器环境 统一格式配置
    ├── .env                        # 环境配置 (后期可以在优化为 prod, pre, test, dev 多环境配置)
    ├── .eslintrc                   # eslint 检查项 配置
    ├── .prettierignore             # Prettier 忽略配置
    ├── .prettierrc                 # Prettier 配置
    ├── .umirc.js                   # umi 配置
    ├── tsconfig.json               # .ts 文件配置
    ├── tslint.json                 # tslint 检查项 配置
    ├── typings.d.ts                # 全局类型配置
    └── package.json                # 项目依赖
```
