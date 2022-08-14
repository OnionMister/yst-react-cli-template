import { POST } from 'utils';

export default {
    state: {
        commonData: [], // 公共数据
    },

    reducers: {
        setState(state, payload = {}) {
            return { ...state, ...payload };
        },
    },

    effects: {
        async postCommonData(payload) {
            const res = await POST('/api/CommonData', payload);
            this.setState({ commonData: res || [] });
            return res;
        },
    },
};
