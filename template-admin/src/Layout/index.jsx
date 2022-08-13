import React, { useState, memo } from 'react';
import { Outlet } from 'react-router-dom';
import classBind from 'classnames/bind';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo';
import SiderMenu from './components/SiderMenu';
import Breadcrumb from './components/BreadCrumb';
import style from './style.less';

const cx = classBind.bind(style);
const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ getMenuList, getMenuListLoading }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Spin
            tip='loading...'
            spinning={getMenuListLoading}
            wrapperClassName={cx('layout__spin')}
        >
            <Layout className={cx('layout')}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Logo collapsed={collapsed}/>
                    <SiderMenu
                        getMenuList={getMenuList}
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
                            // minHeight: 280,
                            position: 'relative',
                            overflowY: 'auto',
                        }}
                    >
                        <Breadcrumb />
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Spin>
    );
};

const mapStateToProps = ({ global, loading }) => ({
    menus: global.menus,
    getMenuListLoading: loading.effects.global.getMenuList,
});

const mapDispatchToProps = ({ global }) => ({
    getMenuList: global.getMenuList,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(DefaultLayout));
