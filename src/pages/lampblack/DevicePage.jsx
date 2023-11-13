import {Button, Card, Space, Table} from "antd";
import React, {useCallback, useRef} from "react";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {useRequest} from "ahooks";
import {page} from "../../client/lampblack/device.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import useTableScroll from "../../hooks/useTableScroll.js";
import CardX from "../../components/CardX.jsx";

let onClick;

const columns = [
    {
        title: '设备 ID',
        dataIndex: 'mn',
        ellipsis: true,
        width: 100
    },
    {
        title: 'ICCID',
        dataIndex: 'iccid',
        width: 100
    },
    {
        title: '部门 ID',
        dataIndex: 'deptId',
        ellipsis: true,
        width: 150
    },
    {
        title: '行政区划 ID',
        dataIndex: 'areaId',
        ellipsis: true,
        width: 120
    },
    {
        title: '餐厅 ID',
        dataIndex: 'restaurantId',
        ellipsis: true,
        width: 150
    },
    {
        title: '餐厅名',
        dataIndex: 'restaurantName',
        ellipsis: true,
        width: 200
    },
    {
        title: '经度',
        dataIndex: 'longitude',
        width: 100
    },
    {
        title: '纬度',
        dataIndex: 'latitude',
        width: 100
    },
    {
        title: '备注',
        dataIndex: 'remark'
    },
    {
        title: '创建时间',
        dataIndex: 'createAt',
        width: 150
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
            return (
                <Space>
                    <Button type='primary' size='small'
                            onClick={() => onClick(record.mn, record.restaurantName)}>数据</Button>
                </Space>
            )
        }
    }
]

const defaultPageParams = {
    pageSize: 15,
}

function DevicePage() {
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    onClick = useCallback((mn, rn) => (
        navigate(`/device/${mn}`, {state: rn})
    ), [])

    const {data, loading, run} = useRequest(page, {
        defaultParams: [defaultPageParams],
        loadingDelay: 300,
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
    })

    return (
        <Card className='full-container' title='设备列表'>
            <Table
                size='small'
                loading={loading}
                columns={columns}
                bordered
                rowKey='mn'
                scroll={{x: 1200}}
                pagination={{
                    pageSize: data?.pageSize,
                    total: data?.total,
                    current: data?.pageNum,
                    size: 'small',
                    showSizeChanger: false,
                    position: ['bottomLeft'],
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

export default DevicePage;