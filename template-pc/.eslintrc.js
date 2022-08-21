/**
 * @description eslintV8对vscode存在兼容问题
 * @description eslint配置，根据情况选择配置
 * npm install eslint -D
 * npx eslint --init
 * @description 安装react相关依赖
 * npm i eslint-config-airbnb-base babel-eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D
 * @description 安装prettier，防止prettier-vscode和eslint冲突
 * npm i eslint-config-prettier eslint-plugin-prettier -D
 */

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: 'babel-eslint', // include eslint-plugin-import
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        allowImportExportEverywhere: true, // 不限制eslint对import使用位置
        ecmaVersion: 12, // 使用latest后import会报错 Parsing error: ImportDeclaration....
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
    ],
    rules: {
        // off
        'no-use-before-define': 0,
        'no-console': 0,
        'no-alert': 0,
        'no-plusplus': 0,
        'no-unused-expressions': 0,
        'func-names': 0,
        eqeqeq: 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-new': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'linebreak-style': 0,
        'no-nested-ternary': 0,
        'arrow-body-style': 0,
        'prefer-const': 0,
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'import/extensions': 0,
        'prefer-arrow-callback': 0,

        // warn
        'import/prefer-default-export': 1,
        'no-unused-vars': 1,

        // error
        // 'no-unused-vars': ['error'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        indent: [2, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
        }],
        'space-before-function-paren': [2, 'never'],
        'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
        'max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],

        // react
        'react/jsx-no-undef': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react-hooks/rules-of-hooks': 2,
        // 使用后会添加不希望出现的变量到依赖
        // 'react-hooks/exhaustive-deps': 1,
        'react/jsx-max-props-per-line': [2, { maximum: 1 }],
        'react/jsx-closing-bracket-location': 2,
        'react/jsx-closing-tag-location': 2,
        'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
        'react/jsx-wrap-multilines': [2, {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'ignore',
            logical: 'ignore',
            prop: 'ignore',
        }],
        'react/jsx-no-duplicate-props': 2,
        //   'react/jsx-one-expression-per-line': 2,

        // no debugger
        'no-debugger': 2,
    },
};
