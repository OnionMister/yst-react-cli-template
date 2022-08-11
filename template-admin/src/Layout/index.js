import React, { useState } from 'react';
import {
    Route, Routes, Navigate,
} from 'react-router-dom';
import { flattenRoutes } from 'utils';
import routes from 'routes';
import classBind from 'classnames/bind';
import {
    Layout, Row, Col, Menu, Avatar, message,
} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo';
import SiderMenu from './components/SiderMenu';
import Breadcrumb from './components/BreadCrumb';
import style from './style.less';

const cx = classBind.bind(style);
const { Header, Content, Sider } = Layout;
const flattenRouteList = flattenRoutes(routes);

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

                    <Routes>
                        {flattenRouteList.map((route, index) => {
                            if (route.redirect) {
                                return (
                                    <Route
                                        path="/"
                                        key={index}
                                        element={
                                            <Navigate
                                                key={index}
                                                from={route.from}
                                                to={route.to}
                                            />
                                        }
                                    />
                                );
                            }
                            return (
                                <Route
                                    {...route}
                                    element={<route.element />}
                                    key={index}
                                />
                            );
                        })}
                    </Routes>
                </Content>
            </Layout>
        </Layout>
        // <Layout className={cx('layout')}>
        //     <Sider
        //         collapsed={collapsed}
        //         width={200}
        //     >
        //         <Logo collapsed={collapsed} />
        //         <SiderMenu
        //             collapsed={collapsed}
        //         />
        //     </Sider>
        //     <Routes>
        //         {flattenRouteList.map((route, index) => {
        //             if (route.redirect) {
        //                 return (
        //                     <Route
        //                         path="/"
        //                         key={index}
        //                         element={
        //                             <Navigate
        //                                 key={index}
        //                                 from={route.from}
        //                                 to={route.to}
        //                             />
        //                         }
        //                     />
        //                 );
        //             }
        //             return (
        //                 <Route
        //                     {...route}
        //                     element={<route.element />}
        //                     key={index}
        //                 />
        //             );
        //         })}
        //     </Routes>
        // </Layout>
    );
};

export default DefaultLayout;
