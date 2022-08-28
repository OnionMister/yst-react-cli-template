process.env.NODE_ENV = 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const PATH = require('./PATH');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        path: path.resolve(PATH.DIST),
        filename: 'js/[name]-[contenthash:7].js',
        chunkFilename: 'js/[name]-[contenthash:7].js',
        crossOriginLoading: 'anonymous',
        assetModuleFilename: 'img/[name]-[hash:10][ext]',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true, // 多进程
                extractComments: true, // 提取注释
                terserOptions: {
                    ecma: undefined, // 不限制es规范
                    parse: {},
                    compress: {
                        drop_console: false, // 不删除console
                        drop_debugger: true,
                        pure_funcs: ['console.log'], // 移除console.log
                    },
                },
            }),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            // 减少页面js文件中重复打包共用的node_modules代码
            maxAsyncRequests: Infinity,
            // 防止提取的chunk过碎
            minSize: 1024 * 50,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
        usedExports: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
});
