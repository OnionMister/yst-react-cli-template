import React from 'react';
import { loadableLazy } from 'utils';
import { Navigate, Outlet } from 'react-router';

export default [
    {
        path: 'menus1',
        breadcrumb: '菜单1',
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Navigate to="studentManagement" />,
            },
            {
                path: 'studentManagement',
                breadcrumb: '学生列表管理',
                element: loadableLazy(() => import('pages/menus1/StudentManagement')),
            },
        ],
    },
];
