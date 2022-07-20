// 将路由按照路由模块分类
import home from './home';

export default [
    ...home,
    {
        redirect: true,
        hideChildrenInMenu: true,
        from: '/',
        to: '/home',
    },
];
