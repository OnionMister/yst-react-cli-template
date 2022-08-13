/**
 * @Description: Home组件
 */
import { GET } from 'utils';

export default {
    state: {
        message: '我是rematch数据',
    },

    reducers: {
        setState(state, payload = {}) {
            return { ...state, ...payload };
        },
    },

    effects: {
        async getCourseList(payload) {
            const res = await GET('/api/course/list', { ...payload });
            return res;
        },
    },
};
