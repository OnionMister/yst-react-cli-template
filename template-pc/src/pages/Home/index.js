import React from 'react';
import classBind from 'classnames/bind';
import { connect } from 'react-redux';
import styles from './style.less';

const cx = classBind.bind(styles);

const Home = (props) => {
    const { count } = props;
    console.log(count);
    return (
        <div className={cx('home')}>
            Hello111 World
        </div>
    );
};


const mapStateToProps = ({ example }) => ({
    ...example,
});
const mapDispatchToProps = (dispatch) => {
    return { ...dispatch.example };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
