import {Button, Space, Table} from "antd";
import {useRequest} from "ahooks";
import {selfTree} from "../../client/user-admin/resource.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {SearchOutlined} from "@ant-design/icons";
import {recursiveRemoveEmptyChildren} from "../../utils/common-utils.js";
import useTableScroll from "../../hooks/useTableScroll.js";
import {useRef} from "react";
import CardX from "../../components/CardX.jsx";

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 250
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width: 150
    },
    {
        title: '资源类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (text) => {
            if (0 === text) {
                return "后端资源";
            } else if (1 === text) {
                return "前端资源"
            } else {
                return <>非法资源类型: {text}</>
            }
        }
    },
    {
        title: '所属服务',
        dataIndex: 'service',
        key: 'service',
        width: 200
    },
    {
        title: '资源定位符',
        dataIndex: 'uri',
        key: 'uri',
        width: 200
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true
    },
    {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        width: 150
    },
    {
        title: '操作',
        key: 'action',
        width: 130,
        fixed: 'right',
        render: (text, record, index) => {
            return <Space>
                <Button size={'small'}>修改</Button>
                <Button size={'small'} danger onClick={() => console.log(text, record, index)}>删除</Button>
            </Space>
        }
    }
]


function ResourcePage() {
    const tableRef = useRef();
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const {data, loading, refresh} = useRequest(selfTree, {
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    })
    const {y} = useTableScroll(tableRef);
    recursiveRemoveEmptyChildren(data);

    return (
        <CardX left='资源管理'>
            <div style={{marginBottom: 10}}>
                <Space>
                    <Button icon={<SearchOutlined/>} type='primary' onClick={refresh}>刷新</Button>
                </Space>
            </div>
            <div ref={tableRef} style={{flex: "auto"}}>
                <Table
                    loading={loading}
                    bordered
                    rowKey='id'
                    pagination={{
                        position: ['none']
                    }}
                    scroll={{y: y}}
                    size='small'
                    columns={columns} dataSource={data}/>
            </div>
        </CardX>
    );
}

export default ResourcePage;