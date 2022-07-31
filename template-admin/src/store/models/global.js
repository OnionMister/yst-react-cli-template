import { GET } from 'utils';

export default {
    state: {
        menus: [], // 菜单列表
    },

    reducers: {
        setState(state, payload = {}) {
            return { ...state, ...payload };
        },
    },

    effects: {
        // 获取当前登录用户菜单列表
        async getMenuList(payload) {
            const res = await GET('/api/menuList', payload);
            this.setState({ menus: res || [] });
            return res;
        },
    },
};
