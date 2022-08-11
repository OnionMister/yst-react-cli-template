import React, { useEffect, useState, memo } from 'react';
import { Menu } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import classBind from 'classnames/bind';
import style from './style.less';

const baseFieldNames = { key: 'key', label: 'label', children: 'children' };

const cx = classBind.bind(style);

// 辅助函数，通过当前path递归计算上级菜单
// 用于面包屑和边栏菜单展示
const getPathQueue = (menus, pathname) => {
    // 递归函数
    const hasChild = (menu, paths) => {
        const { children, key } = menu;
        if (key === pathname) return paths.push(menu);
        if (!children) return false;
        const has = children.some((c) => hasChild(c, paths));
        if (has) return paths.push(menu);
        return null;
    };

    const paths = [];
    menus.forEach((i) => hasChild(i, paths));
    return paths.reverse();
};
// 获取全部一级菜单，默认都要打开
const getAllFolder = (menus) => {
    return menus.map((i) => i.key);
};
const SiderMenu = ({ getMenuList, fieldNames = {}, icon = <ProfileOutlined /> }) => {
    fieldNames = { ...baseFieldNames, ...fieldNames };
    const [menus, setMenus] = useState([]);
    const location = useLocation();
    const { pathname } = location;
    const locPaths = getPathQueue(menus, pathname);
    const selectedKeys = locPaths.map((m) => m.key).slice(-1);
    const [openKeys, setOpenKeys] = useState([]);

    const recursionOperation = (arr = []) => arr.reduce((pre, cur) => {
        let newItem = {};
        newItem = {
            key: cur[fieldNames.key],
            children: cur[fieldNames.children],
            label: <Link to={cur[fieldNames.key]}>{cur[fieldNames.label]}</Link>,
            icon,
        };
        if (cur?.[fieldNames.children]?.length) {
            newItem.children = recursionOperation(cur[fieldNames.children]);
        }
        pre.push(newItem);
        return pre;
    }, []);

    useEffect(() => {
        getMenuList().then((res) => {
            // 当前antd版本Menu组件不支持fieldNames变更键名，需要手动处理
            const newMenus = recursionOperation(res);
            setOpenKeys(getAllFolder(newMenus));
            setMenus(newMenus);
        });
    }, []);

    return (
        <Menu
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            mode="inline"
            theme="dark"
            items={menus}
            className={cx('menu')}
        />
    );
};

const mapStateToProps = ({ global }) => ({
    menus: global.menus,
});

const mapDispatchToProps = ({ global }) => ({
    getMenuList: global.getMenuList,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(SiderMenu));
