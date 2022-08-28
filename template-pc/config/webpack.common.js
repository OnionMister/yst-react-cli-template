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
            ignoreOrder: true,
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
                use: [{
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
                exclude: /node_modules/,
                use: [
                    isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                            // 启用 css module
                            modules: {
                                localIdentName: '[local]--[hash:base64:7]',
                                auto: /(?<![\\/]assets[\\/]less[\\/](reset|share))\.less$/i,
                            },
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                sideEffects: true,
                include: /node_modules/,
                use: [
                    isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: { // antd定制主题配置
                                    'primary-color': '#1890ff',
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|woff|eot|ttf)$/,
                type: 'asset',
                parser: {
                    // 小于20kb的图片转base64
                    // 优点：减少请求数量  缺点：体积会增大三分之一
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 20kb
                    },
                },
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
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
        chunkIds: 'named',
        moduleIds: 'named',
    },
};
