import React, { useState } from 'react';
import classBind from 'classnames/bind';
import { connect } from 'react-redux';
import List from './components/List'
import styles from './style.less';

const cx = classBind.bind(styles);

const Home = ({ message }) => {
    const [count, setCount] = useState(1)
    return (
        <div className={cx('home')} onClick={() => setCount(count + 1)}>
            Hello World - {message}
            {count}
            <List />
        </div>
    );
};


const mapStateToProps = ({ home }) => ({
    ...home,
});
const mapDispatchToProps = (dispatch) => {
    return { ...dispatch.home };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
