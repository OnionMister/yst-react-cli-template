import React from 'react';

const List = ({ courseList }) => {
    return (
        <div>
            <h2>我是组件List，以下是MOCK数据</h2>
            {courseList.map(({ courseId, courseName }) => (
                <p key={courseId}>{`${courseId} -- ${courseName}`}</p>
            ))}
        </div>
    );
};

export default List;
