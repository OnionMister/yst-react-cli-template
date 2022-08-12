import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import classBind from 'classnames/bind';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo';
import SiderMenu from './components/SiderMenu';
import Breadcrumb from './components/BreadCrumb';
import style from './style.less';

const cx = classBind.bind(style);
const { Header, Content, Sider } = Layout;

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className={cx('layout')}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={1}
            >
                <Logo collapsed={collapsed}/>
                <SiderMenu
                    collapsed={collapsed}
                    fieldNames={{ key: 'menuUri', label: 'menuName' }}
                />
            </Sider>
            <Layout className={cx('site-layout')}>
                <Header
                    className={cx('site-layout-background')}
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: cx('trigger'),
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className={cx('site-layout-background')}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/* <Breadcrumb /> */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
