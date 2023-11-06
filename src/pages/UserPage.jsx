import {Button, Card, Divider, Flex, Input, Space, Table} from "antd";
import useUserStore from "../store/useUserStore.js";
import {page} from "../client/user-admin/user.js";
import {useRequest} from "ahooks";
import {useState} from "react";
import {INVALID_TOKENS} from "../client/client.js";
import {useNavigate} from "react-router-dom";
import repository from "../utils/repository.js";
import {USER_INFO_KEY} from "../const/common.js";

const columns = [
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
        render: (text, record, index) => {
            return <Button danger size='small' onClick={() => console.log(text, record, index)}>删除</Button>
        }
    }
]


const defaultPageParams = {
    pageSize: 12
}

function UserPage() {
    const [uname, setUname] = useState('');
    const token = useUserStore(t => t.token);
    const updateHasAuth = useUserStore(t => t.updateAuthState)
    const navigate = useNavigate();

    const {data, error, loading, run: runPage} = useRequest(page, {
        defaultParams: [[defaultPageParams, token]],
        onSuccess: t => t?.list.map(e => e.key = e.id), // 处理 <li> key 的 warning
        onError: err => {
            const code = err?.code;
            if (code && INVALID_TOKENS.has(code)) {
                updateHasAuth(false);
                repository.remove(USER_INFO_KEY);
                navigate('/signIn');
            }
        }
    });

    return (
        <Card title='用户管理' className='full-container'>
            <Flex vertical>
                <Space>
                    <Input placeholder='用户名' onChange={e => setUname(e.target.value)}/>
                    <Button type={"primary"} onClick={() => runPage([{...defaultPageParams, username: uname}, token])}>提交</Button>
                </Space>
                <Divider/>
                <Table
                    size='small'
                    loading={loading}
                    columns={columns}
                    bordered
                    pagination={{
                        pageSize: data?.pageSize,
                        total: data?.total,
                        current: data?.pageNum,
                        size: 'small',
                        showTotal: t => `共 ${t} 条记录`
                    }}
                    dataSource={data?.list}
                />
            </Flex>
        </Card>
    )
}


export default UserPage;



