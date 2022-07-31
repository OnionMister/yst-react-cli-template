import React from 'react';
import classBind from 'classnames/bind';
import styles from './style.less';

const cx = classBind.bind(styles);

const Login = () => {
    return (
        <div
            className={cx('login')}
        >
            登陆页
        </div>
    );
};

export default Login;
