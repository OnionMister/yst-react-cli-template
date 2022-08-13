import React from 'react';
import classBind from 'classnames/bind';
import style from './style.less';

const cx = classBind.bind(style);

const Logo = ({ collapsed = false }) => {
    return (
        <div className={cx('logo', 'df-center-center')}>
            <div className={cx('logo__pic')}></div>
            {
                collapsed ? null : (
                    <>
                        <span className={cx('line')}></span>
                        <span className={cx('system__name')}>管理后台</span>
                    </>
                )
            }
        </div>
    );
};

export default Logo;
