/**
 * @Description: Home组件
 */
module.exports = {
    // 获取员工列表
    'GET /api/course/list': {
        status: 0,
        message: 'success',
        data: [
            {
                courseName: '课程1',
                courseId: 1,
            },
            {
                courseName: '课程2',
                courseId: 2,
            },
            {
                courseName: '课程3',
                courseId: 3,
            },
        ],
    },
};
