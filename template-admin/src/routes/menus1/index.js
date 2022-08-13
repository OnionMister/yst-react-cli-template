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
                element: <Navigate to="menus1-1" />,
            },
            {
                path: 'menus1-1',
                breadcrumb: '菜单1-1',
                element: loadableLazy(() => import('pages/Home')),
            },
        ],
    },
];
