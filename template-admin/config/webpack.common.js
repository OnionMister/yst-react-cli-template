const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const threadLoader = require('thread-loader');

threadLoader.warmup(
    {
        workerParallelJobs: 50,
        workerNodeArgs: ['--max-old-space-size=1024'],
        poolRespawn: false,
        poolTimeout: 2000,
        poolParallelJobs: 50,
        name: 'my-pool',
    },
    [
        'babel-loader',
        'less-loader',
    ],
);
const PATH = require('./PATH');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: path.resolve(PATH.SRC, 'index'),
    },
    plugins: [
        new LodashModuleReplacementPlugin({
            collections: true,
            shorthands: true,
            paths: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css',
            chunkFilename: 'css/[name]-[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            filename: isDev ? 'index.html' : '../../../index.html', // 保证生产环境下index.html位于dist下
            template: 'public/index.html',
            title: 'pc端',
            inject: 'body', // 引入的bundle.js在body底部
            chunksSortMode: 'none',
        }),
        isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['cache-loader', {
                    loader: 'babel-loader',
                    options: {
                        plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
                    },
                }],
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                sideEffects: true,
                use: [
                    isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
                    { loader: 'css-loader', options: { importLoaders: 2 } }, 'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(?:png|jpe?g|gif|svg|woff|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 图片小于10kB，会将图片传换成base64编码处理，
                            // 目的是为了将小图转为编码减少请求数量减轻服务器压力，
                            // 会导致图片体积增大，即base64编码比原图体积大（建议对小于12kB的图做编码处理，大图不处理）
                            limit: 10 * 1024,
                            // 关闭es6模块化处理，避免与html-loader的common.js规范冲突，发生冲突会导致路径变成“[object Module]”
                            // 新版本已经没有这个问题了 可以不关闭。
                            esModule: false,
                            // 默认图片命名为chunk的hash值，太长了
                            name: 'img/[name]-[sha512:hash:base64:7].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.ts', '.tsx'],
        modules: [
            PATH.SRC,
            path.resolve(PATH.ROOT, 'node_modules'),
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};