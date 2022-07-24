process.env.NODE_ENV = 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    },
    optimization: {
        minimize: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            // 减少页面js文件中重复打包共用的node_modules代码
            maxAsyncRequests: Infinity,
            // 防止提取的chunk过碎
            minSize: 1024 * 50,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        // 对共同前缀的包做了合并(a-b, a-c => a.1234.js)
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/-]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
        chunkIds: 'named',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ids.HashedModuleIdsPlugin(),
    ],
});
