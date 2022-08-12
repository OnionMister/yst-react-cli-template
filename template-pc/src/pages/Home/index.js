import React, { useState, useEffect } from 'react';
import classBind from 'classnames/bind';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { Button } from 'antd';
import imgSrc from 'assets/img/dog.jpeg';
import List from './components/List';
import styles from './style.less';

const cx = classBind.bind(styles);
const Home = ({ message, getCourseList, getCourseListLoading }) => {
    const [count, setCount] = useState(1);
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        getCourseList().then((res) => {
            setCourseList(res || []);
        });
    }, []);
    return (
        <Spin
            tip='loading...'
            spinning={getCourseListLoading}
            wrapperClassName={cx('home__spin')}
        >
            <div className={cx('home')}>
                <img src={imgSrc}></img>
                <div>欢迎使用yst-react-cli</div>
                <div>{message}</div>
                <Button
                    type='primary'
                    onClick={() => setCount(count + 1)}
                >count + 1
                </Button>
                <div>我是useState数据：{count}</div>
                <List courseList={courseList}/>
            </div>
        </Spin>
    );
};

const mapStateToProps = ({ home, loading }) => ({
    getCourseListLoading: loading.effects.home.getCourseList,
    ...home,
});
const mapDispatchToProps = (dispatch) => {
    return { ...dispatch.home };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
