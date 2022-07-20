const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const program = require('commander');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PATH = require('./PATH');
const common = require('./webpack.common');
let customConfig = require('../customConfig');

let currentNodeModulesPath = path.join(__dirname, '..', 'node_modules');
let alias = {
    react: `${currentNodeModulesPath}/react`,
    'react-dom': `${currentNodeModulesPath}/react-dom`,
};
program
    .allowUnknownOption()
    .option('--lib [names]', 'debug common modules');
program.parse(process.argv);

let lib = typeof program.lib;
console.log('type of', lib);
if (lib === 'boolean') {
    alias['@xdf'] = path.join(__dirname, '..', '..');
}
if (lib === 'string') {
    lib.split(',').forEach((name) => {
        alias[`@xdf/${name}`] = path.join(__dirname, '..', '..', name);
    });
}
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(PATH.DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]-chunk.js',
        publicPath: '/',
        crossOriginLoading: 'anonymous',
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
