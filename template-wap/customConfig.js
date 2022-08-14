//  自定义项目配置
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
    opsConfig: {
        CDN_FILE_BASE: 'react/template-pc',
    },
    webpackConfig: {
        stats: { // shell编译时控制台输出的内容有颜色区分
            colors: true,
        },
        devServer: {
            hot: true,
            open: true,
            host: 'localhost',
            port: 8602,
            historyApiFallback: true,
            setupMiddlewares(middlewares, devServer) { // webpack5 中间件新配置
                if (!devServer) {
                    throw new Error('webpack-dev-server is not defined');
                }
                apiMocker(devServer.app, path.join(__dirname, './mock/index.js'));
                return middlewares;
            },
            proxy: {
                '/api': {
                    // target: 'https://www.baidu.com/',
                    changeOrigin: true,
                    secure: false,
                    logLevel: 'debug',
                },
            },
        },
    },
};
