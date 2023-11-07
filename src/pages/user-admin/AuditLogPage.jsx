import {Button, Card, Table, Tag, Typography} from "antd";
import {useRequest} from "ahooks";
import {page} from '../../client/user-admin/audit-log.js'
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        ellipsis: true,
        width: 80
    },
    {
        title: '用户 ID',
        dataIndex: 'userId',
        ellipsis: true,
        width: 150
    },
    {
        title: '用户名',
        dataIndex: 'username',
        ellipsis: true,
        width: 120
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        ellipsis: true,
        width: 120
    },
    {
        title: '服务',
        dataIndex: 'service',
        ellipsis: true,
        width: 200
    },
    {
        title: '模块',
        dataIndex: 'module',
        ellipsis: true,
        width: 120
    },
    {
        title: '接口名称',
        dataIndex: 'apiName',
        ellipsis: true,
        width: 150
    },
    {
        title: '接口地址',
        dataIndex: 'uri',
        ellipsis: true
    },
    {
        title: '执行结果',
        dataIndex: 'resultStatus',
        ellipsis: true,
        width: 80,
        render: text => {
            console.log(text)
            switch (text) {
                case 0:
                    return <Tag color='default'>其它</Tag>
                case 1:
                    return <Tag color='success'>成功</Tag>
                case 2:
                    return <Tag color='warning'>失败</Tag>
                case 3:
                    return <Tag color='error'>异常</Tag>
                default:
                    return <Tag color='default'>未知</Tag>
            }
        }
    },
    {
        title: '操作时间',
        dataIndex: 'createAt',
        ellipsis: true,
        width: 150
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
            return <Button danger size='small' onClick={() => console.log(text, record, index)}>删除</Button>
        }
    }
]


const defaultPageParams = {
    pageSize: 15
}

function AuditLogPage() {
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);

    const {data, loading, run} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    })

    return (
        <Card className='full-container' title='审计日志'>
            <Table
                size='small'
                loading={loading}
                columns={columns}
                bordered
                rowKey='id'
                scroll={{y: 650, x: 'max-content'}}
                expandable={{
                    expandedRowRender: record => {
                        return (
                            <>
                                <Typography.Title level={5} style={{margin: 0}}>
                                    请求入参
                                </Typography.Title>
                                <Typography.Text code copyable={record.reqParams}>
                                    {record.reqParams || '空'}
                                </Typography.Text>
                                <Typography.Title level={5} style={{margin: 0}}>
                                    响应结果
                                </Typography.Title>
                                <Typography.Text code copyable={record.respResult}>
                                    {record.respResult}
                                </Typography.Text>
                            </>
                        )
                    },
                    rowExpandable: record => true
                }}
                pagination={{
                    pageSize: data?.pageSize,
                    total: data?.total,
                    current: data?.pageNum,
                    size: 'small',
                    showSizeChanger: false,
                    showTotal: t => `共 ${t} 条记录`,
                    onChange: t => {
                        run({...defaultPageParams, pageNum: t})
                    }
                }}
                dataSource={data?.list}
            />
        </Card>
    )
}


export default AuditLogPage;