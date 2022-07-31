import { loadableLazy } from 'utils';

export default [
    {
        path: '/home',
        breadcrumb: '首页',
        element: loadableLazy(() => import('pages/Home')),
    },
    {
        path: '/home1',
        breadcrumb: '首页',
        element: loadableLazy(() => import('pages/Home')),
    },
];
