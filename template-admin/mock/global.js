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
                menuName: '菜单1',
                menuUri: '/menu1',
                children: [
                    {
                        menuId: 2,
                        menuName: '学生管理',
                        menuUri: '/menus1/studentManagement',
                        children: null,
                    },
                    {
                        menuId: 3,
                        menuName: '菜单1-2',
                        menuUri: '/menu1/1-2',
                        children: null,
                    },
                ],
            },
            {
                menuId: 4,
                menuName: '菜单2',
                menuUri: '/menu2',
                children: [
                    {
                        menuId: 5,
                        menuName: '菜单2-1',
                        menuUri: '/menu1/2-1',
                        children: null,
                    },
                ],
            },
            {
                menuId: 7,
                menuName: '菜单3',
                menuUri: '/menu3',
                children: [
                    {
                        menuId: 8,
                        menuName: '菜单3-1111111111111111',
                        menuUri: '/menu3/3-1',
                        children: null,
                    },
                    {
                        menuId: 9,
                        menuName: '菜单3-2',
                        menuUri: '/menu3/3-2',
                        children: null,
                    },
                ],
            },
            {
                menuId: 19,
                menuName: '菜单4',
                menuUri: '/menu4',
                children: [
                    {
                        menuId: 20,
                        menuName: '菜单4-1',
                        menuUri: '/menu4/4-1',
                        children: null,
                    },
                    {
                        menuId: 21,
                        menuName: '菜单4-2',
                        menuUri: '/menu4/4-2',
                        children: null,
                    },
                ],
            },
            {
                menuId: 17,
                menuName: '菜单5',
                menuUri: '/menu5',
                children: [
                    {
                        menuId: 18,
                        menuName: '菜单5-1',
                        menuUri: '/menu5/5-1',
                        children: null,
                    },
                    {
                        menuId: 18,
                        menuName: '菜单5-2',
                        menuUri: '/menu5/5-2',
                        children: null,
                    },
                    {
                        menuId: 18,
                        menuName: '菜单5-3',
                        menuUri: '/menu5/5-3',
                        children: null,
                    },
                    {
                        menuId: 18,
                        menuName: '菜单5-4',
                        menuUri: '/menu5/5-4',
                        children: null,
                    },
                    {
                        menuId: 18,
                        menuName: '菜单5-5',
                        menuUri: '/menu5/5-5',
                        children: null,
                    },
                ],
            },
        ],
    },
};
