/**
 * @Description: Home组件
 */
module.exports = {
    // 获取员工列表
    'GET /api/menuList': {
        status: 0,
        message: 'success',
        data: [
            {
                menuId: 1,
                menuName: '试题',
                menuUri: '/questionsManagement',
                children: [
                    {
                        menuId: 2,
                        menuName: '创建试题',
                        menuUri: '/questionsManagement/testQuestionsManagement/createQuestions/0/0',
                        children: null,
                    },
                    {
                        menuId: 3,
                        menuName: '试题管理',
                        menuUri: '/questionsManagement/testQuestionsManagement',
                        children: null,
                    },
                ],
            },
            {
                menuId: 4,
                menuName: '考试',
                menuUri: '/examManagement',
                children: [
                    {
                        menuId: 5,
                        menuName: '考试管理',
                        menuUri: '/examManagement/testManagement',
                        children: null,
                    },
                ],
            },
            {
                menuId: 7,
                menuName: '题库管理中心',
                menuUri: '/questionLibraryManagement',
                children: [
                    {
                        menuId: 8,
                        menuName: '角色管理',
                        menuUri: '/questionLibraryManagement/roleManagement',
                        children: null,
                    },
                    {
                        menuId: 9,
                        menuName: '员工管理',
                        menuUri: '/questionLibraryManagement/employeeManagement',
                        children: null,
                    },
                ],
            },
            {
                menuId: 19,
                menuName: '套卷',
                menuUri: '/paperPackage',
                children: [
                    {
                        menuId: 20,
                        menuName: '套卷管理',
                        menuUri: '/paperPackage/paperPackageManagement',
                        children: null,
                    },
                ],
            },
            {
                menuId: 17,
                menuName: '估分系统',
                menuUri: '/estimateScore',
                children: [
                    {
                        menuId: 18,
                        menuName: '估分试卷管理',
                        menuUri: '/estimateScore/esQuestionsManagement',
                        children: null,
                    },
                ],
            },
        ],
    },
};
