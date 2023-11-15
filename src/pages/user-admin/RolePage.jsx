import CardX from "../../components/CardX.jsx";
import {Button, Table, Tag} from "antd";
import useUserStore from "../../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {page} from "../../client/user-admin/role.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";

const columns = [
    {
        title: '角色 ID',
        dataIndex: 'id'
    },
    {
        title: '角色 名称',
        dataIndex: 'name'
    },
    {
        title: '是否可删除',
        dataIndex: 'deletable',
        render: (text) => {
            if (text === true) {
                return <Tag color='success'>可删除</Tag>
            }
            return <Tag color='error'>不可删除</Tag>
        }
    },
    {
        title: '备注',
        dataIndex: 'remark'
    },
    {
        title: '创建时间',
        dataIndex: 'createAt'
    }
]


const defaultPageParams = {
    pageSize: 15
}

function RolePage() {
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const {data, loading, run, refresh} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    });

    return (
        <CardX title='角色管理'>
            <div style={{marginBottom: 10}}>
                <Button type='primary' onClick={refresh}>刷新</Button>
            </div>
            <div style={{flex: "auto"}}>
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
                            run({...defaultPageParams, pageNum: t})
                        }
                    }}
                    dataSource={data?.list}
                />
            </div>
        </CardX>
    )
}


export default RolePage;