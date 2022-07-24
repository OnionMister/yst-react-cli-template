// 将路由按照路由模块分类
import React from 'react';
import Exception from 'components/Exception';
import home from './home';

export default [
    ...home,
    {
        redirect: true,
        hideChildrenInMenu: true,
        from: '/',
        to: '/home',
    },
    {
        path: '/exception-403',
        element: (props) => <Exception type="403" />,
    },
    {
        path: '/exception-10403',
        element: (props) => <Exception type="10403" />,
    },
    {
        path: '/exception-404',
        element: (props) => <Exception type="404" />,
    },
    {
        path: '/exception-500',
        element: (props) => <Exception type="500" />,
    },
    {
        element: (props) => <Exception type="404" />,
    },
];
