import React, { useEffect, useState, memo } from 'react';
import { Menu } from 'antd';
import { ProfileOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import classBind from 'classnames/bind';
import style from './style.less';

const baseFieldNames = { key: 'key', label: 'label', children: 'children' }


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
const SiderMenu = ({
    getMenuList, collapsed, fieldNames = {},
    icon = <ProfileOutlined />,
}) => {
    fieldNames = { ...baseFieldNames, ...fieldNames };
    const [menus, setMenus] = useState([]);
    // const location = useLocation();
    // const { pathname } = location;
    // const locPaths = getPathQueue(menus, pathname);
    // const selectedKeys = locPaths.map((m) => m.menuName).slice(-1);
    // const [openKeys, setOpenKeys] = useState([]);

    const recursionOpreation = (arr = []) => arr.reduce((pre, cur) => {
        console.log('cur[fieldNames.children] :>> ', cur, fieldNames.children, cur[fieldNames.children]);
        let newItem = {};
        newItem = {
            ...cur, key: cur[fieldNames.key], children: cur[fieldNames.children],
            label: cur[fieldNames.label],
            // label: <Link to={cur[fieldNames.key]}>{cur[fieldNames.label]}</Link>,
            icon,
        }
        if (cur?.[fieldNames.children]?.length) {
            newItem.children = recursionOpreation(cur[fieldNames.children]);
        }
        pre.push(newItem);
        return pre;
    }, []);

    useEffect(() => {
        getMenuList().then((res) => {
            setMenus(recursionOpreation(res));
        });
    }, []);

    // useEffect(() => {
    //     if (menus.length) {
    //         let newMens = menus.filter((item) => window.location.href.indexOf(item.componentPath) !== -1);
    //         setOpenKeys(getAllFolder(newMens));
    //     }
    // }, [menus, collapsed]);
    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menus}
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
