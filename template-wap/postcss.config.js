module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env'), // 允许使用未来css
        require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 需要转换的单位
            viewportWidth: 750, //  设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 都转换
            viewportUnit: 'vw', // 转换后的单位
            fontViewportUnit: 'vw', // 子题转换后的单位
            minPixelValue: 1, // 大于1的数值会被转换
            mediaQuery: false, // 媒体查询单位不转换
            replace: true,
            exclude: [
                /node_modules/,
            ],
            landscapeWidth: 1334, // 横屏尺寸
            landscapeUnit: 'vw', // 横屏单位
            landscape: false, // 不依据横屏宽度生成媒体查询
        }),
    ],
};
