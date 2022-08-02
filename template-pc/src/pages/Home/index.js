import React, { useState, useEffect } from 'react';
import classBind from 'classnames/bind';
import { connect } from 'react-redux';
import imgSrc from 'assets/img/logo.png';
import List from './components/List';
import styles from './style.less';

const cx = classBind.bind(styles);
const Home = ({ message, getCourseList }) => {
    const [count, setCount] = useState(1);
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        getCourseList().then((res) => {
            setCourseList(res || []);
        });
    }, []);
    return (
        <div
            className={cx('home')}
            onClick={() => setCount(count + 1)}
        >
            <img src={imgSrc}></img>
            <div>欢迎使用yst-react-cli</div>
            <div>{message}</div>
            <div>我是useState数据 - {count}</div>
            <List courseList={courseList}/>
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
