import {Button, Card, Image, Modal, Space, Table} from "antd";
import React, {useCallback, useState} from "react";
import {useRequest} from "ahooks";
import {page} from "../../client/lampblack/restaurant.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {InfoWindow, Map, Marker, ZoomControl} from "react-bmapgl";

let locate;
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        ellipsis: true,
        width: 100
    },
    {
        title: '餐厅名',
        dataIndex: 'name',
    },
    {
        title: '部门 ID',
        dataIndex: 'deptId',
        ellipsis: true,
        width: 100
    },
    {
        title: '区划 ID',
        dataIndex: 'areaId',
    },
    {
        title: '占地面积',
        dataIndex: 'acreage',
    },
    {
        title: '街道地址',
        dataIndex: 'address',
    },
    {
        title: '经纬度',
        width: 170,
        render: record => {
            return `${record?.longitude} , ${record?.latitude}`
        }
    },
    {
        title: '企业负责人',
        dataIndex: 'principal',
    },
    {
        title: '负责人电话',
        dataIndex: 'principalMobile',
    },
    {
        title: '菜系',
        render: (record) => {
            console.log(record)
        }
    },
    {
        title: '门头照片',
        dataIndex: 'photoUrl',
        render: text => {
            return <Image width='50px' height='50px' src={text}/>
        }
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
                            onClick={() => locate(record)}>位置</Button>
                </Space>
            )
        }
    }
]

const defaultPageParams = {
    pageSize: 15,
}

function RestaurantPage() {
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const [record, setRecord] = useState({lng: 0, lat: 0});
    const [open, setOpen] = useState(false);
    const {data, loading, run} = useRequest(page, {
        defaultParams: [defaultPageParams],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState)
    })

    locate  = useCallback((record) => {
        setRecord(record)
        setOpen(true);
    }, []);

    return (
        <Card className='full-container' title='餐厅信息'>
            <Table
                size='small'
                loading={loading}
                columns={columns}
                bordered
                rowKey='id'
                scroll={{y: 650, x: 2000}}
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
            <Modal open={open} onCancel={() => setOpen(false)} destroyOnClose={true}>
                <Map  center={{lng: record.longitude, lat: record.latitude}} zoom="13"
                     enableDragging
                      enableScrollWheelZoom={false}
                      enableDoubleClickZoom={false}
                >
                    <Marker position={{lng: record.longitude, lat: record.latitude}}/>
                    <InfoWindow position={{lng: record.longitude, lat: record.latitude}}>
                        {record.name}
                    </InfoWindow>
                    <ZoomControl />
                </Map>
            </Modal>
        </Card>
    )
}

export default RestaurantPage;