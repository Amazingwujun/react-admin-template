import {useRequest} from "ahooks";
import {page} from "../../client/user-admin/dept.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {Button, Space, Table} from "antd";
import CardX from "../../components/CardX.jsx";
import {recursiveRemoveEmptyChildren} from "../../utils/common-utils.js";
import useTableScroll from "../../hooks/useTableScroll.js";
import {useRef} from "react";

const columns = [
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
]

const defaultPageParams = {
    pageSize: 15
}

function DeptPage() {
    const tableRef = useRef();
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const {data, loading, run, refresh} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    })
    const {y} = useTableScroll(tableRef);
    recursiveRemoveEmptyChildren(data);

    return (
        <CardX title='部门管理'>
            <div style={{marginBottom: 10, display: "flex", justifyContent: 'flex-end'}}>
                <Space align='center'>
                    <Button type='primary' onClick={refresh}>刷新</Button>
                </Space>
            </div>
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
        </CardX>
    )
}


export default DeptPage;