import {Button, Card, Divider, Flex, Form, Input, Modal, Space, Table} from "antd";
import useUserStore from "../../store/useUserStore.js";
import {create, del, page, update} from "../../client/user-admin/user.js";
import {useRequest} from "ahooks";
import {useState} from "react";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import {inputValueTrim, makeCurMethod} from "../../utils/common-utils.js";


function makeColumns(runDelete, runUpdate) {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
        },
        {
            title: '租户 ID',
            dataIndex: 'tenantId',
            key: 'tenantId',
            ellipsis: true,
        },
        {
            title: '部门 ID',
            dataIndex: 'deptId',
            key: 'deptId',
            ellipsis: true,
        },
        {
            title: '账号(名称)',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: '创建时间',
            dataIndex: 'createAt',
            key: 'createAt'
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => {
                return (
                    <Space>
                        <Button size='small' onClick={() => runUpdate(record)}>更新</Button>
                        <Button danger size='small' onClick={() => runDelete({id: record.id})}>删除</Button>
                    </Space>
                )
            }
        }
    ]
}


const defaultPageParams = {
    pageSize: 12
}

function UserPage() {
    const [uname, setUname] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false)
    const updateAuthState = useUserStore(t => t.updateAuthState)
    const navigate = useNavigate();
    const [form] = Form.useForm()

    // 分页获取
    const {data, error, loading, run: runPage, refresh} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: err => COMMON_ERR_HANDLE(err, navigate, updateAuthState)
    });

    // 增删改
    const {runCreate, runDelete, runUpdate} = makeCurMethod(create, del, update,
        () => {
            refresh()
            setModalOpen(false)
        },
        err => COMMON_ERR_HANDLE(err, navigate, updateAuthState)
    )

    // 列表配置
    const columns = makeColumns(runDelete, runUpdate);


    function createUser() {
        setModalOpen(true)
    }

    return (
        <Card title='用户管理' className='full-container'>
            <Flex vertical>
                <Flex justify='space-between'>
                    <Space>
                        <Input placeholder='用户名' onChange={e => setUname(inputValueTrim(e))}/>
                        <Button type={"primary"}
                                onClick={() => runPage({...defaultPageParams, username: uname})}>提交</Button>
                    </Space>
                    <Space>
                        <Button type='primary' onClick={createUser}>新增用户</Button>
                    </Space>
                </Flex>
                <Divider/>
                <Table
                    size='small'
                    loading={loading}
                    columns={columns}
                    bordered
                    rowKey='id'
                    pagination={{
                        pageSize: data?.pageSize,
                        total: data?.total,
                        current: data?.pageNum,
                        size: 'small',
                        showTotal: t => `共 ${t} 条记录`,
                        onChange: t => {
                            runPage({...defaultPageParams, pageNum: t, username: uname})
                        }
                    }}
                    dataSource={data?.list}
                />
            </Flex>
            <Modal title='创建用户' open={isModalOpen} onCancel={() => {
                console.log('onCancel invoked')
                setModalOpen(false)
            }}>
                <Form
                    name='basic'
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}


export default UserPage;



