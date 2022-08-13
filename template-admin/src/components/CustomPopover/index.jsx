import React from 'react';
import { Popover } from 'antd';

import classBind from 'classnames/bind';
import styles from './style.less';

const cx = classBind.bind(styles);

const CustomPopover = ({ text, customStyle = {}, customName }) => {
    return (
        <Popover
            content={text}
            overlayClassName="comment-popover"
        >
            <div
                className={cx('ellipsis-text-one', 'custom__popover__con', { ...customName })}
                style={{ ...customStyle }}
            >
                {text}
            </div>
        </Popover>
    );
};

export default CustomPopover;
