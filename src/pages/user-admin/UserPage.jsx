import {Button, Card, Divider, Flex, Input, Space, Table} from "antd";
import useUserStore from "../../store/useUserStore.js";
import {page} from "../../client/user-admin/user.js";
import {useRequest} from "ahooks";
import {useState} from "react";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import {inputValueTrim} from "../../utils/common-utils.js";

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
    const [uname, setUname] = useState(null);
    const updateAuthState = useUserStore(t => t.updateAuthState)
    const navigate = useNavigate();

    const {data, error, loading, run: runPage} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: err => COMMON_ERR_HANDLE(err, navigate, updateAuthState)
    });

    return (
        <Card title='用户管理' className='full-container'>
            <Flex vertical>
                <Space>
                    <Input placeholder='用户名' onChange={e => setUname(inputValueTrim(e))}/>
                    <Button type={"primary"}
                            onClick={() => runPage({...defaultPageParams, username: uname})}>提交</Button>
                </Space>
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
        </Card>
    )
}


export default UserPage;



