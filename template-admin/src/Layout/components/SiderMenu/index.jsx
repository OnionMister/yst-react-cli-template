import React, { useEffect, useState, memo } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import classBind from 'classnames/bind';
import style from './style.less';

const cx = classBind.bind(style);

// 菜单项目
const menuItems = (menus) => menus.map((item) => {
    const {
        menuName, menuUri, children,
    } = item;
    const title = (
        <span>
            {menuName}
        </span>
    );
    return children && children.length && children[0].menuUri ? (
        <Menu.SubMenu
            key={menuName}
            title={title}
            style={{ userSelect: 'none' }}
        >
            {menuItems(children)}
        </Menu.SubMenu>
    ) : (
        <Menu.Item
            key={menuName}
            style={{ userSelect: 'none' }}
        >
            <Link to={menuUri}>{title}</Link>
        </Menu.Item>
    );
});

// 辅助函数，通过当前path递归计算上级菜单
// 用于面包屑和边栏菜单展示
const getPathQueue = (menus, pathname) => {
// 递归函数
    const hasChild = (menu, paths) => {
        const { children, menuUri } = menu;
        if (menuUri === pathname) return paths.push(menu);
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
    return menus.map((i) => i.menuName);
};
const SiderMenu = ({ menus, getMenuList, collapsed }) => {
    const location = useLocation();
    const { pathname } = location;
    const locPaths = getPathQueue(menus, pathname);
    const selectedKeys = locPaths.map((m) => m.menuName).slice(-1);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        getMenuList();
    }, []);

    useEffect(() => {
        if (menus.length) {
            let newMens = menus.filter((item) => window.location.href.indexOf(item.componentPath) !== -1);
            setOpenKeys(getAllFolder(newMens));
        }
    }, [menus, collapsed]);
    return (
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            defaultSelectedKeys={selectedKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            style={{ userSelect: 'none' }}
        >
            {menuItems(menus)}
        </Menu>
    );
};

const mapStateToProps = ({ global }) => ({
    menus: global.menus,
});

const mapDispatchToProps = ({ global }) => ({
    getMenuList: global.getMenuList,
});

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
