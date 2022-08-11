import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import classBind from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import routes from 'routes';
import styles from './style.less';

const cx = classBind.bind(styles);

const BreadcrumbView = () => {
    const history = useNavigate();
    const [breadcrumbCon, setBreadcrumbCon] = useState([]); // 要渲染的面包屑

    // 扁平化路由且子路由补全
    const flattenRoute = (arr, parent) => arr.reduce((prev, cur) => {
        // 过滤不包含路由或面包屑的项
        if (!cur.path || !cur.breadcrumb) {
            return prev;
        }
        const item = { path: cur.path, breadcrumb: cur.breadcrumb };
        if (parent) {
            // 子路由补全
            item.path = parent.path + item.path;
        }
        prev.push(item);
        // 有子项则递归
        Array.isArray(cur.childRoutes) && (prev = prev.concat(flattenRoute(cur.childRoutes, item)));
        return prev;
    }, []);

    // 生成面包屑导航结构
    const getBreadcrumbs = ({ flattenRoutes, location }) => {
        // 初始化匹配数组match
        let matches = [];
        // 携带query参数，当点击面包屑的时候带回原路由上的参数。
        (location.pathname + location.search)
        // 取得路径名，然后将路径分割成每一路由部分.
            .split('/')
        // 对每一部分执行一次调用`getBreadcrumb()`的reduce.
            .reduce((prev, curSection) => {
            // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
                const pathSection = `${prev}/${curSection}`;
                const breadcrumb = getBreadcrumb({
                    flattenRoutes,
                    curSection,
                    pathSection,
                });
                // 将面包屑导入到matches数组中
                breadcrumb && matches.push(breadcrumb);
                // 传递给下一次reduce的路径部分
                return pathSection;
            });
        return matches;
    };

    // 得到当前location 对应的路由信息（用location和路由routes匹配）
    const getBreadcrumb = ({ flattenRoutes, curSection, pathSection }) => {
        const matchRoute = flattenRoutes.find((ele) => {
            const { breadcrumb, path } = ele;
            if (!breadcrumb || !path) {
                throw new Error(
                    'Router中的每一个route必须包含 `path` 以及 `breadcrumb` 属性',
                );
            }
            // 当前路由和query进行分割
            const comparePath = pathSection.split('?')[0];
            // 查找是否有匹配
            return matchPath(comparePath, { path, exact: true });
        });

        // 返回breadcrumb的值，没有就返回原匹配子路径名
        if (matchRoute) {
            return {
                content: matchRoute.breadcrumb || curSection,
                // path: matchRoute.path,
                path: pathSection,
            };
        }
        // 对于routes表中不存在的路径, 返回空，最终不被收集
        return null;
    };

    const breadcrumbQueryHandle = (breadcrumb) => {
        if (sessionStorage.breadcrumb) {
            // 拿到带有query参数带路由
            const sessionBreadcrumb = JSON.parse(sessionStorage.breadcrumb);
            if (sessionBreadcrumb.length < breadcrumb.length) {
                const isKeep = sessionBreadcrumb.every((item, index) => {
                    if (item.path == breadcrumb[index].path || item.path.includes(`${breadcrumb[index].path}?`)) {
                        return true;
                    }
                    return false;
                });
                if (isKeep) {
                    sessionBreadcrumb.forEach((item, index) => {
                        breadcrumb[index].path = item.path;
                    });
                }
            }
        }
        setBreadcrumbCon(breadcrumb);
        sessionStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
    };
    useEffect(() => {
        breadcrumbQueryHandle(getBreadcrumbs({ flattenRoutes: flattenRoute(routes), location: window.location }));
        // 监听路由变化
        history.listen(() => {
            breadcrumbQueryHandle(getBreadcrumbs({ flattenRoutes: flattenRoute(routes), location: window.location }));
        });
    }, []);
    const extraBreadcrumbItems = breadcrumbCon.map((item, index) => {
        return (
            <Breadcrumb.Item key={index}>
                {
                    index === 0 || index === (breadcrumbCon.length - 1) ? (
                        <span>{item.content}</span>
                    ) : <Link to={item.path}>{item.content}</Link>
                }
                {/* <span>{item.content}</span> */}
            </Breadcrumb.Item>
        );
    });
    return (
        <div className={cx('breadcrumb-area')}>
            <span
                className={cx('breadcrumb-span')}
                style={{ margin: '16px', marginRight: '0' }}
            >当前位置：
            </span>
            <Breadcrumb
                className={cx(styles.breadcrumb)}
                style={{ display: 'inline-block', marginLeft: 0 }}
            >
                {extraBreadcrumbItems}
            </Breadcrumb>
        </div>
    );
};
export default BreadcrumbView;
