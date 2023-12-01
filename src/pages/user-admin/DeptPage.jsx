import {useRequest} from "ahooks";
import {create, del, page, update} from "../../client/user-admin/dept.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {Button, Form, Input, Modal, Space, Table, TreeSelect} from "antd";
import CardX from "../../components/CardX.jsx";
import {makeCurMethod, recursiveRemoveEmptyChildren} from "../../utils/common-utils.js";
import useTableScroll from "../../hooks/useTableScroll.js";
import {useRef, useState} from "react";

function makeColumns(runDelete, runUpdate) {
    return [
        {
            title: '部门名称',
            dataIndex: 'name'
        },
        {
            title: '部门 ID',
            dataIndex: 'id',
        },
        {
            title: '序号',
            dataIndex: 'sortNum'
        },
        {
            title: '备注',
            dataIndex: 'remark'
        },
        {
            title: '操作',
            render: record => {
                return (
                    <Space>
                        <Button onClick={() => runUpdate(record)}>更新</Button>
                        <Button danger onClick={() => runDelete({id: record.id})}>删除</Button>
                    </Space>
                )
            }
        }
    ]
}

function parseTreeData(data) {
    if (!data) {
        return null;
    }
    let result = [];
    for (const datum of data) {
        result.push({
            title: datum.name,
            value: datum.id,
            children: parseTreeData(datum.children)
        })
    }
    return result;
}


const defaultPageParams = {
    pageSize: 15
}

function DeptPage() {
    const tableRef = useRef();
    const [createForm] = Form.useForm()
    const [currentRecord, setCurrentRecord] = useState({});
    const [updateForm] = Form.useForm()
    const [isCreateModalOpen, setCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const {data, loading, run, refresh} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    })
    const {y} = useTableScroll(tableRef);
    recursiveRemoveEmptyChildren(data);

    // 增删改方法
    const {runCreate, runDelete, runUpdate} = makeCurMethod(create, del, update,
        () => {
            refresh();
            setCreateModalOpen(false);
            setUpdateModalOpen(false);
        },
        err => COMMON_ERR_HANDLE(err, navigate, updateAuthState)
    )

    const columns = makeColumns(runDelete, record => {
        setCurrentRecord(record);
        updateForm.setFieldsValue({
            name: record.name,
            pid: record.pid,
            remark: record.remark
        })
        setUpdateModalOpen(true);
    });

    function createUser() {
        setCreateModalOpen(true);
    }

    return (
        <CardX left='部门管理'
               right={<Space align='center'>
                   <Button type='primary' onClick={createUser}>新增</Button>
               </Space>}
        >
            {/*<div style={{marginBottom: 10, display: "flex", justifyContent: 'flex-end'}}>*/}

            {/*</div>*/}
            <div ref={tableRef} style={{flex: "auto"}}>
                <Table
                    size='small'
                    loading={loading}
                    columns={columns}
                    bordered
                    rowKey='id'
                    pagination={{
                        position: ['none']
                    }}
                    scroll={{y: y}}
                    dataSource={data}
                />
            </div>
            <Modal title='创建部门'
                   open={isCreateModalOpen}
                   onCancel={() => setCreateModalOpen(false)}
                   onOk={createForm.submit}
                   destroyOnClose={true}
            >
                <Form
                    name='basic'
                    form={createForm}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={(values) => {
                        // 提交创建
                        console.log(values)
                        const {name, pid, remark} = values;
                        runCreate({name, pid, remark})
                    }}
                >
                    <Form.Item
                        label="部门名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入部门名称',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="上级部门"
                        name="pid"
                        rules={[
                            {
                                required: false,
                                message: '请选择上级部门',
                            },
                        ]}
                    >
                        <TreeSelect
                            treeLine
                            allowClear
                            style={{
                                width: 300,
                            }}
                            treeData={parseTreeData(data)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                        rules={[
                            {
                                required: false
                            },
                        ]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title='更新部门'
                   open={isUpdateModalOpen}
                   onCancel={() => setUpdateModalOpen(false)}
                   onOk={updateForm.submit}
                   destroyOnClose={true}
            >
                <Form
                    name='basic'
                    form={updateForm}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={(values) => {
                        const {name, pid, remark} = values;
                        console.log('currentRecord', currentRecord, 'values', values)
                        runUpdate({id: currentRecord.id, name, pid, remark})
                    }}
                >
                    <Form.Item
                        label="部门名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入部门名称',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="上级部门"
                        name="pid"
                        rules={[
                            {
                                required: false,
                                message: '请选择上级部门',
                            },
                        ]}
                    >
                        <TreeSelect
                            treeLine
                            allowClear
                            style={{
                                width: 300,
                            }}
                            treeData={parseTreeData(data)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                        rules={[
                            {
                                required: false
                            },
                        ]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
        </CardX>
    )
}


export default DeptPage;