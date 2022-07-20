// require("core-js/stable"); 
const path = require('path');
let customConfig = require('../customConfig');

const CDN_FILE_BASE = customConfig.opsConfig.CDN_FILE_BASE; // 自定义配置的CDN目录
const ROOT = process.cwd(); // 根目录
const SRC = path.resolve(ROOT, 'src'); // src目录
const DIST = path.resolve(ROOT, 'dist', 'statics', CDN_FILE_BASE); // 资源打包位置

module.exports = {
    ROOT,
    SRC,
    DIST,
    CDN_FILE_BASE,
};