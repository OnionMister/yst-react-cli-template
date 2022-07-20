

export default {
    state: {
        userInfo: {},
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
