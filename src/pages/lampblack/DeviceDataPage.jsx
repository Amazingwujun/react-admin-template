import {useLocation, useNavigate, useParams} from "react-router-dom";
import useUserStore from "../../store/useUserStore.js";
import {useRequest} from "ahooks";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import {Button, Card, DatePicker, Divider, Flex, message, Space, Table, Tag, Typography} from "antd";
import React, {useRef, useState} from "react";
import dayjs from "dayjs";
import {messages as deviceMessages} from "../../client/lampblack/device.js";
import {SearchOutlined} from "@ant-design/icons";


function CustomTag({state}) {
    if (state === 1) {
        return <Tag color='success'>开</Tag>
    } else if (state === 0) {
        return <Tag color='warning'>关</Tag>
    }
    return <Tag color='error'>未知</Tag>
}

const columns = [
    {
        title: '时间戳',
        dataIndex: 'receivedAt',
        key: 'receivedAt',
        width: 150
    },
    {
        title: '经纬度',
        width: 160,
        render: record => {
            return `${record?.longitude} , ${record?.latitude}`
        }
    },
    {
        title: '油烟浓度(mg/m3)',
        dataIndex: 'ofc'
    },
    {
        title: '颗粒物浓度(ng/m3)',
        dataIndex: 'pmc'
    },
    {
        title: '非甲烷总烃(mg/m3)',
        dataIndex: 'tnmh'
    },
    {
        title: '净化器开关',
        dataIndex: 'purifierSwitch',
        render: t => <CustomTag state={t}/>
    },
    {
        title: '净化器电流',
        dataIndex: 'purifierCurrent'
    },
    {
        title: '风扇开关状态',
        dataIndex: 'fanSwitch',
        render: t => <CustomTag state={t}/>
    },
    {
        title: '风机电流',
        dataIndex: 'fanCurrent'
    },
    {
        title: '温度(℃)',
        dataIndex: 'temperature'
    },
    {
        title: '湿度',
        dataIndex: 'humidity'
    },
    {
        title: '传感器 1',
        dataIndex: 'sensor1Status',
        render: t => {
            if (t === 1) {
                return <Tag color='success'>连接</Tag>
            }
            return <Tag color='warning'>断开</Tag>
        }
    },
    {
        title: '传感器 2',
        dataIndex: 'sensor2Status'
    },
    {
        title: '屏连接状态',
        dataIndex: 'screenStatus',
        render: t => {
            if (t === 1) {
                return <Tag color='success'>连接</Tag>
            }
            return <Tag color='warning'>断开</Tag>
        }
    }
]

const defaultMessagesParams = {
    needPayload: true,
    pageSize: 10
}

const DATE_TIME_FORMATTER = 'YYYY-MM-DD HH:mm:ss';

function DeviceDataPage() {
    const scrollElement = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const {deviceMn} = useParams();
    const [now] = useState(dayjs())
    const [total, setTotal] = useState(null);
    const [dataArr, setDataArr] = useState([])
    const [datetimeRange, setDatetimeRange] = useState({
        startAt: now.subtract(7, 'day').format(DATE_TIME_FORMATTER),
        endAt: now.format(DATE_TIME_FORMATTER)
    });

    const {loading, run} = useRequest(deviceMessages, {
        defaultParams: [{
            ...defaultMessagesParams,
            mn: deviceMn,
            startAt: datetimeRange.startAt,
            endAt: datetimeRange.endAt
        }],
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
        onSuccess: t => {
            if (!total) {
                setTotal(t.total);
            }
            setDataArr([...dataArr, ...t?.list]);
        }
    })

    function onRangePickerChange(_, dates) {
        // 变更时间，则清空数据
        setDataArr([]);
        setTotal(null)
        setDatetimeRange({startAt: dates[0], endAt: dates[1]});
    }

    function search() {
        setDataArr([]);
        setTotal(null)
        run({
            ...defaultMessagesParams,
            mn: deviceMn,
            startAt: datetimeRange.startAt,
            endAt: datetimeRange.endAt
        })
    }

    const onScrollEvent = (event) => {
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
            // 总数
            let len = dataArr.length;
            if (len >= total && len !== 0) {
                message.warning(`当前时间段数据已全部加载！`);
                return
            }
            // 继续获取数据
            let endAt = dataArr[len - 1].receivedAt;
            run({
                ...defaultMessagesParams,
                mn: deviceMn,
                startAt: datetimeRange.startAt,
                endAt: endAt
            });
        }
    }

    return (
        <Card className='full-container' title={`${location.state} / ${deviceMn}`}>
            <Flex vertical>
                <Flex justify='space-between'>
                    <span>
                        数据加载进度:
                        <span style={{fontSize: 18, fontWeight: "bold", color: '#1677ff'}}>{dataArr?.length}</span>
                        /
                        <span style={{fontSize: 20, fontWeight: "bold", color: '#1677ff'}}>{total || 0}</span>
                    </span>
                    <Space>
                        <DatePicker.RangePicker showTime
                                                defaultValue={[now.subtract(7, 'day'), now]}
                                                onChange={onRangePickerChange}/>
                        <Button icon={<SearchOutlined/>} type="primary" onClick={search}>搜索</Button>
                    </Space>
                </Flex>
                <Divider/>
                <div ref={scrollElement} onScrollCapture={onScrollEvent}>
                    <Table
                        size='small'
                        loading={loading}
                        columns={columns}
                        bordered
                        rowKey='receivedAt'
                        pagination={{
                            position: ['none'],
                            pageSize: dataArr?.length
                        }}
                        dataSource={dataArr}
                        scroll={{y: 200}}
                        expandable={{
                            expandedRowRender: record => {
                                return (
                                    <Card title='原始报文'>
                                        <Typography.Text style={{fontSize: 20}} code copyable={record.payload}>
                                            {record.payload || '空'}
                                        </Typography.Text>
                                    </Card>
                                )
                            },
                            rowExpandable: record => true
                        }}
                    />
                </div>
            </Flex>
        </Card>
    )
}


export default DeviceDataPage;