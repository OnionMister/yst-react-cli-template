/**
 *  异常页面组件 404, 403, 500
*/

import React from 'react';
import classBind from 'classnames/bind';
import styles from './style.less';

const cx = classBind.bind(styles);
const typeMap = {
    403: {
        title: '403',
        desc: '暂时没有使用权限，请联系管理员开通',
    },
    10403: {
        title: '10403',
        desc: '暂时没有该菜单使用权限，请联系管理员开通',
    },
    404: {
        title: '404',
        desc: '抱歉，你访问的页面不存在',
    },
    500: {
        title: '500',
        desc: '抱歉，服务器出错了',
    },
};
const Exception = ({ type }) => {
    console.log('type: ', type);
    const pageType = type in typeMap ? type : '404';
    const expConfig = typeMap[pageType];

    return (
        <div className={cx('error__warp')}>
            <h1 className={cx('error__num')}>{expConfig.title}</h1>
            <span className={cx('error__desc')}>{expConfig.desc}</span>
        </div>
    );
};

export default Exception;
