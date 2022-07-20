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
    

## 目录说明

    ├── babel.config.js // babel 配置
    ├── config // webpack 配置
    │   ├── PATH.js
    │   ├── webpack.common.js
    │   ├── webpack.dev.js
    │   └── webpack.prod.js
    ├── public // webpack 配置
    │   ├── index.html
    │   └── 其他不需要打包的静态资源
    ├── jsconfig.json // vscode 配置
    ├── mock // 模拟数据
    │   └── index.js
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    └── src
        ├── app.js
        ├── assets // 公共静态资源
        │   ├── js
        │   ├── scss
        │   └── images
        
        ├── components // 组件目录
        │   ├── Nav
        │   │   ├── img // 组件相关图片
        │   │   │   └── nav.jpg
        │   │   ├── index.js // 组件代码
        │   │   └── style.scss // 组件相关样式
        ├── store // 数据模型
        │   ├── example
        │   │   └── index.js // 数据
        |   └── index.js
        ├── layout // 布局模板
        │   ├── Default
        │   │   └── index.js // 数据
        |   └── index.js
        ├── services // 接口请求
        │   ├── example
        │   │   └── index.js // 数据
        |   └── index.js
        ├── index.js // 入口文件
        ├── pages // 页面级组件
        │   ├── another-one
        │   │   ├── index.js
        │   │   └── style.scss
        │   └── home-page
        │       ├── img
        │       │   └── b.jpg
        │       ├── index.js
        │       └── style.scss
        ├── routes // 路由
            ├── home
            │   └── index.js 
            └── index.js

