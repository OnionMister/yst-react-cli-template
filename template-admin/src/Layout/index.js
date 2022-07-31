import React, { useState } from 'react';
import {
    Route, Routes, Navigate,
} from 'react-router-dom';
import { flattenRoutes } from 'utils';
import routes from 'routes';
import {
    Layout, Row, Col, Menu, Avatar, message,
} from 'antd';
import {
    LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined,
} from '@ant-design/icons';
import Logo from './components/Logo';

const { Header, Content, Sider } = Layout;
const flattenRouteList = flattenRoutes(routes);

const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider
                collapsed={collapsed}
                width={200}
            >
                <Logo collapsed={collapsed} />
                {/* <SiderMenu
                    menus={menus}
                    collapsed={collapsed}
                /> */}
            </Sider>
            <Routes>
                {flattenRouteList.map((route, index) => {
                    console.log('route: ', route);
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
        </Layout>
    );
};

export default DefaultLayout;
