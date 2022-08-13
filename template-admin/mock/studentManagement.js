/**
 * @Description: demo
 */
module.exports = {
    // 获取学生列表
    'POST /api/student/list': {
        message: 'success',
        status: 0,
        data: {
            result: [
                {
                    id: 1,
                    studentName: '黄艺博',
                    studentId: 122,
                    class: '高一三班',
                    gender: '男',
                },
                {
                    id: 2,
                    studentName: '张子涵',
                    studentId: 123,
                    class: '高一三班',
                    gender: '女',
                },
                {
                    id: 3,
                    studentName: '吕子乔',
                    studentId: 124,
                    class: '高一三班高一三班高一三班高一三班高一三班',
                    gender: '',
                },
            ],
            pages: 1,
            total: 200,
            pageSize: 10,
            currentPage: 1,
        },
    },
};
