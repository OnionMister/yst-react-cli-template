import { POST, exportDownload } from 'utils';

export default {
    state: {
        studentList: {}, // 学员列表
        studentListParams: {
            pageNum: 1,
            pageSize: 20,
        },
    },

    reducers: {
        setState(state, payload = {}) {
            return { ...state, ...payload };
        },
    },

    effects: {
        // 获取当前登录用户菜单列表
        async postStudentList(payload) {
            const res = await POST('/api/student/list', payload);
            this.setState({ studentList: res || [], studentListParams: payload });
            return res;
        },

        // 导出
        async postStudentListExport(payload) {
            const res = await exportDownload('/api/student/list/export', payload);
            return res;
        },
    },
};
