/**
 * @description 路由相关方法封装
 */
import Loadable from 'react-loadable';
import Loading from 'components/Loading';

// 路由扁平化
export const flattenRoutes = (routes = [], parentPath = '') => {
    return routes.reduce((pre, cur) => {
        const path = parentPath + cur.path;
        const curItem = { ...cur, path, parentPath };
        return pre.concat(cur.childRoutes ? flattenRoutes(cur.childRoutes, path) : curItem);
    }, []);
};

// 路由懒加载
export const loadableLazy = (component, config = {}) => Loadable({
    loader: component,
    loading: Loading,
    delay: 300,
    timedOut: 10000,
    ...config,
});
