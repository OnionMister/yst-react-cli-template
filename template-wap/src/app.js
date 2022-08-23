import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import Layout from 'Layout';
import store from 'store';
import 'assets/less/reset.less';
import 'assets/less/share.less';

// 生产环境可能是以子目录形式提供的服务,所以这里需要配置 basename
let basename = '';
const baseTag = document.getElementsByTagName('base')[0];
if (baseTag) basename = baseTag.getAttribute('href');

export default () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router basename={basename}>
                    <Layout />
                </Router>
            </Provider>
        </ConfigProvider>
    );
};
