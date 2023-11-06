import {Button, Card, Flex, Input, Space, Table, Tag} from "antd";
import {useRequest} from "ahooks";
import {page as pageRequest} from '../../client/user-admin/tenant.js'
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: t => {
            if (t === 0) {
                return <Tag color="success">激活</Tag>
            }
            return <Tag color='error'>冻结</Tag>
        }
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
    },
    {
        title: '过期时间',
        dataIndex: 'expireAt',
        key: 'expireAt'
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
    pageSize: 13
};

function TenantPage() {
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);

    const {data, loading, run: runPage} = useRequest(pageRequest, {
        defaultParams: [defaultPageParams],
        onSuccess: t => t.list.map(e => e.key = e.id),
        onError: err => COMMON_ERR_HANDLE(err, navigate, updateAuthState)
    })

    return (
        <Card title='租户管理' className='full-container'>
            <Flex vertical>
                <Space style={{marginBottom: 10}}>
                    <Input placeholder='请输入租户 id' />
                    <Button type={"primary"} onClick={() => runPage({...defaultPageParams})}>提交</Button>
                </Space>
                <Flex flex={"auto"}>
                    <Table className='full-container' loading={loading} columns={columns} size='small'
                           dataSource={data?.list}/>
                </Flex>
            </Flex>
        </Card>
    )
}

export default TenantPage;