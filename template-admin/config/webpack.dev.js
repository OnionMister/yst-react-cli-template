const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PATH = require('./PATH');
const common = require('./webpack.common');
let customConfig = require('../customConfig');

let currentNodeModulesPath = path.join(__dirname, '..', 'node_modules');
let alias = {
    react: `${currentNodeModulesPath}/react`,
    'react-dom': `${currentNodeModulesPath}/react-dom`,
};

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(PATH.DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]-chunk.js',
        publicPath: '/',
        crossOriginLoading: 'anonymous',
        assetModuleFilename: 'img/[name]-[hash:10][ext]',
    },
    resolve: {
        alias,
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
}, customConfig.webpackConfig);
