import React, { useEffect } from 'react';
import classBind from 'classnames/bind';
import { connect } from 'react-redux';
import {
    Button, Table, Form, Input, Tabs, message,
} from 'antd';
import CustomPopover from 'components/CustomPopover';
import { numberInputLimit } from 'utils';
import styles from './style.less';

const { TabPane } = Tabs;
const cx = classBind.bind(styles);
const StudentManagement = ({
    studentListParams, postStudentList, postStudentListLoading, studentList, postStudentListExport,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        postStudentList({ pageNum: 1, pageSize: 20 });
    }, []);

    const columns = [
        {
            title: '学生编号',
            dataIndex: 'studentId',
            key: 'studentId',
            align: 'center',
            width: '20%',
            render: (text) => (
                <CustomPopover
                    text={text || '-'}
                    customStyle={{ margin: '0 auto', maxWidth: 'calc(100% - 20px)' }}
                />
            ),
        },
        {
            title: '学生姓名',
            dataIndex: 'studentName',
            key: 'studentName',
            align: 'center',
            width: '20%',
            render: (text) => (
                <CustomPopover
                    text={text || '-'}
                    customStyle={{ margin: '0 auto', maxWidth: 'calc(100% - 20px)' }}
                />
            ),
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            width: '15%',
            render: (text) => (text || '-'),
        },
        {
            title: '班级',
            dataIndex: 'class',
            key: 'class',
            align: 'center',
            width: '30%',
            render: (text) => (
                <CustomPopover
                    text={text || '-'}
                    customStyle={{ margin: '0 auto', maxWidth: 'calc(100% - 20px)' }}
                />
            ),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '15%',
            render: (_, row) => {
                return (
                    <span
                        className={cx('operation-btn', { disable: row.id == 2 })}
                        onClick={() => message.info('你点击了')}
                    >
                        点击
                    </span>
                );
            },
        },
    ];

    const onFinish = (values) => {
        postStudentList({
            ...studentListParams,
            ...values,
        });
    };

    // 翻页
    const handelPageChange = (page, pageSize) => {
        postStudentList({
            ...studentListParams,
            pageNum: page,
            pageSize,
        });
    };
    return (
        <div className={cx('studentManagement')}>
            <div className={cx('page-title')}>学生列表管理</div>
            <div className={cx('page-con')}>
                <Form
                    layout="inline"
                    onFinish={onFinish}
                    className={cx('page-form')}
                    form={form}
                >
                    <Form.Item
                        name="studentId"
                        label="学生编号"
                        getValueFromEvent={numberInputLimit}
                    >
                        <Input
                            placeholder="请输入学生编号（纯数字）"
                            style={{ width: 220 }}
                            maxLength={25}
                        />
                    </Form.Item>
                    <Form.Item
                        name="studentName"
                        label="学生姓名"
                    >
                        <Input
                            placeholder="请输入学生姓名"
                            style={{ width: 220 }}
                            maxLength={25}
                        />
                    </Form.Item>
                    <Form.Item className={cx('page-from-submit')}>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                postStudentList({
                                    pageNum: 1,
                                    pageSize: 20,
                                });
                            }}
                            style={{ marginRight: 20 }}
                        >
                    重置
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                    查询
                        </Button>
                    </Form.Item>
                </Form>
                <div className={cx('page-button-area')}>
                    <Button
                        type="primary"
                        onClick={() => postStudentListExport(studentListParams)}
                        className={cx('btn')}
                    >
                        导出
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => message.info('点击了新增')}
                        className={cx('btn')}
                    >
                        新增
                    </Button>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab="学生列表"
                        key="1"
                    >
                        <Table
                            rowKey={'id'}
                            dataSource={studentList.result || []}
                            loading={postStudentListLoading}
                            columns={columns}
                            bordered
                            pagination={{
                                total: studentList.total,
                                pageSize: studentListParams.pageSize,
                                current: studentListParams.pageNum,
                                onChange: handelPageChange,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                showTotal: (total) => `共${total}条记录 第${studentListParams.pageNum}/${studentList.pages}页`,
                            }}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

const mapStateToProps = ({ studentManagement, loading }) => ({
    postStudentListLoading: loading.effects.studentManagement.postStudentList,
    ...studentManagement,
});
const mapDispatchToProps = (dispatch) => {
    return { ...dispatch.studentManagement };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentManagement);
