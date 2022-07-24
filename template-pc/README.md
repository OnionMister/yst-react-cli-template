# pc 项目模板

## 本地开发方法
-  安装依赖 `npm install` 或 `yarn install`
-  运行 `npm start` 或 `yarn start`

## 与远端仓库建立连接
- git初始化`git init -y`
- 连接仓库 `git remote origin add origin 仓库地址`

## 接口联调
修改根目录 customConfig.js 文件内的 proxy 对应的 target, 把target修改为接口地址。（注意：修改配置文件后需重启项目`npm start`）

    `proxy: {
      '/api': {
        target: 'https://www.baidu.com',
      }
    }`

## 开启/关闭MOCK接口
根目录 customConfig.js 文件内的 apiMocker 注释/取消注释，即MOCK接口的关闭/开启。（注意：修改配置文件后需重启项目`npm start`）
mocker-api文档：https://www.npmjs.com/package/mocker-api

    `setupMiddlewares(middlewares, devServer) {
      if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
      }
      apiMocker(app, path.join(__dirname, './mock/index.js'));
      return middlewares;
    }`

## MOCK接口
以 /api/course/list 接口为例，在对应MOCK文件中如下配置即可：
    
    `'#GET /api/course/list': {
      data: ...,
      message: '',
      currentTime: 1559186492460,
      status: 0,
    },`

## CommitLint规范
  - feat：新功能
  - fix：修补 BUG
  - docs：修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等
  - style：不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)
  - refactor：重构（既不修复错误也不添加功能）
  - perf：优化相关，比如提升性能、体验
  - test：增加测试，包括单元测试、集成测试等
  - build：构建系统或外部依赖项的更改
  - ci：自动化流程配置或脚本修改
  - chore：非 src 和 test 的修改，发布版本等
  - revert：恢复先前的提交
    

## 目录说明
├
├─customConfig.js // 如要修改webpack配置建议修改这里
├─src
|  ├─app.js
|  ├─index.js // 入口
|  ├─utils // 工具库
|  |   ├─api.js // 接口封装
|  |   ├─constants.js // 常量
|  |   ├─index.js // 工具统一出口
|  |   ├─routeFun.js // 路由相关方法
|  |   └utils.js // 公用方法
|  ├─store // 状态数据存储
|  |   ├─index.js // 统一出口
|  |   ├─home // 按模块划分存储
|  |   |  └index.js
|  ├─routes // 路由
|  |   ├─index.js
|  |   ├─home // 按模块划分存储
|  |   |  └index.js
|  ├─pages // 页面
|  |   ├─Home
|  |   |  ├─index.js
|  |   |  ├─style.less
|  |   |  ├─components // 该页面私有组件
|  |   |  |     ├─List
|  |   |  |     |  └index.js
|  ├─components // 公用组件
|  |     ├─Loading
|  |     |    └index.jsx
|  |     ├─Exception
|  |     |     ├─index.js
|  |     |     └style.less
|  ├─assets // 静态资源包括less、img等等
|  |   ├─less
|  |   |  ├─reset.less
|  |   |  └share.less
|  ├─Layout // 布局模版
|  |   └index.js
├─public // html、图标
|   ├─favicon.ico
|   └index.html
├─config // 配置
|   ├─PATH.js
|   ├─webpack.common.js
|   ├─webpack.dev.js
|   └webpack.prod.js