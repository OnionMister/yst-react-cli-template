module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
                },
            },
        ],
    ],
    plugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // 按需载入antd
        'lodash',
        [
            '@babel/plugin-transform-runtime', // 处理es6，es7新特性，如：Map、Set、Array.includes() 等
            {
                corejs: 3, // polyfill 需要使用@babel/runtime-corejs2
                useBuildIns: 'usage', // 按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
                proposals: true, // 支持原型上的新特性，如:[].includes()
            },
        ],
        '@babel/plugin-syntax-dynamic-import', // 识别import()
        '@babel/plugin-proposal-class-properties', // 编译类属性
        '@babel/plugin-proposal-nullish-coalescing-operator', // 解析null合并运算符：??
        '@babel/plugin-proposal-optional-chaining', // 解析可选链运算符：?.
    ],
    env: {
        development: {
            plugins: [
                '@babel/transform-react-jsx-source',
            ],
        },
    },
};
