// 如果系统庞大，路由较多，建议按照路由模块分离管理
import React from 'react';
import Exception from 'components/Exception';
import { loadableLazy } from 'utils';
import { Navigate } from 'react-router';
import home from './home';
import menus1 from './menus1';

export default [
    {
        path: '/',
        element: loadableLazy(() => import('Layout')),
        breadcrumb: '首页',
        children: [
            {
                index: true,
                element: <Navigate to="/home" />,
            },
            ...home,
            ...menus1,
        ],
    },
    {
        path: '/login',
        breadcrumb: '登录页',
        element: loadableLazy(() => import('pages/Login')),
    },
    {
        path: '/exception-403',
        element: <Exception type="403" />,
    },
    {
        path: '/exception-10403',
        element: <Exception type="10403" />,
    },
    {
        path: '/exception-404',
        element: <Exception type="404" />,
    },
    {
        path: '/exception-500',
        element: <Exception type="500" />,
    },
    {
        path: '*',
        element: <Navigate to="/exception-404" />,
    },
];
