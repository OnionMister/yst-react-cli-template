import { loadableLazy } from 'utils';

export default [
    {
        path: 'home',
        breadcrumb: '首页',
        meta: {
            layout: 'default',
        },
        element: loadableLazy(() => import('pages/Home')),
    },
    {
        path: 'home1',
        breadcrumb: '首页',
        meta: {
            layout: 'other',
        },
        element: loadableLazy(() => import('pages/Home')),
    },
];
