

export default {
    state: {
        message: '我是rematch数据'
    },

    reducers: {
        setState(state, payload = {}) {
            return { ...state, ...payload };
        },
    },

    effects: {
        // 异步action
    },
};
