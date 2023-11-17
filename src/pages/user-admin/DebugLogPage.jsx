import {AutoComplete, Badge, Button, Input, message, Space} from "antd";
import {useRequest, useWebSocket} from "ahooks";
import {useLayoutEffect, useRef, useState} from "react";
import CardX from "../../components/CardX.jsx";
import repository from "../../utils/repository.js";
import {USER_INFO_KEY} from "../../const/common.js";
import {instanceNames} from "../../client/user-admin/microservice.js";

const ConsoleStyle = {
    resize: 'none',
    height: '100%',
    width: '100%',
    fontFamily: 'Cascadia Mono',
    color: '#D3D7CF',
    background: "#000000",
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 'normal',
    padding: '0px 5px',
    outline: 'none',
}

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3,
}

function statusColor(readyState) {
    switch (readyState) {
        case ReadyState.Connecting:
            return 'processing'
        case ReadyState.Open:
            return 'success'
        case ReadyState.Closing:
            return 'processing'
        case ReadyState.Closed:
            return 'error'
    }
}

function DebugLogPage() {
    const ref = useRef();
    const userInfo = repository.get(USER_INFO_KEY);
    const [autoScrollToBottom, setAutoScrollToBottom] = useState(true);
    const [url, setUrl] = useState('');
    const [filterStr, setFilterStr] = useState('');
    let token;
    if (userInfo) {
        token = JSON.parse(userInfo).token;
    }

    useLayoutEffect(() => {
        if (autoScrollToBottom) {
            ref.current.children[0].scrollTop = ref.current.children[0].scrollHeight;
        }
    });

    const [messages, setMessages] = useState('');
    const {readyState, disconnect, connect} = useWebSocket(
        `${url}?x-token=${token}`, {
            manual: true,
            reconnectLimit: 2,
            onOpen: () => {
                message.success("连接成功")
            },
            onMessage: message => {
                setMessages(t => t.concat(message.data))
            },
            onClose: event => {
                console.log(event)
                message.warning("连接已断开")
                setMessages(t => t.concat(`连接已断开, 原因: [${event?.reason}]\r\n`))
            }
        }
    );

    // 获取微服务名
    const {data: serviceNames} = useRequest(instanceNames);

    const onScrollEvent = (event) => {
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
            setAutoScrollToBottom(true);
        } else {
            setAutoScrollToBottom(false);
        }
    }


    function rightActions() {
        const apOptions = serviceNames
            ?.filter(t => 'app-gateway' !== t)
            .map(t => {
                const wsUrl = 'ws://' + import.meta.env.VITE_TARGET_ADDR + '/' + t + '/websocket/debug-log'
                const wssUrl = 'wss://' + import.meta.env.VITE_TARGET_ADDR + '/' + t + '/websocket/debug-log'
                return {
                    label: <span className='general-font'>{t.toUpperCase()}</span>,
                    options: [
                        {
                            value: wsUrl,
                            label: <span className='general-font'>{wsUrl}</span>
                        },
                        {
                            value: wssUrl,
                            label: <span className='general-font'>{wssUrl}</span>
                        }
                    ]
                }
            })

        return (
            <Space align='center'>
                <Badge status={statusColor(readyState)}></Badge>
                <AutoComplete
                    value={url}
                    allowClear
                    options={apOptions}
                    onChange={t => setUrl(t)}
                    onSelect={(text) => setUrl(text)}
                    onClear={() => setUrl('')}
                    style={{width: 500, fontFamily: 'Cascadia Mono'}}
                />
                <Button type='primary' onClick={connect}>发起连接</Button>
                <Button type='primary' onClick={disconnect}>断开连接</Button>
                <Button type='primary' onClick={() => setMessages('')}>清空日志</Button>
            </Space>
        )
    }


    // 日志预处理
    let finalMessage = messages;
    let lines = messages.split(/\r\n/);
    let lineCount = lines.length - 1;
    if (filterStr && filterStr.trim().length > 0) {
        lines = lines.filter(l => {
            return l.indexOf(filterStr) !== -1
        });
        let temp = '';
        for (let line of lines) {
            temp = temp.concat(line).concat('\r\n');
        }
        finalMessage = temp;
        lineCount = lines.length;
    }

    return (
        <CardX left='应用日志' right={rightActions()}>
            <div style={{
                display: "flex",
                justifyContent: 'end',
                alignItems: 'center',
                fontFamily: 'Cascadia Mono',
                marginBottom: 10
            }}>
                <Space align='baseline'>
                    <Input style={{width: 300}} placeholder='请输入过滤词' onChange={e => setFilterStr(e.target.value)}
                           allowClear/>
                    <span>Total </span>
                    <span style={{fontSize: 18, fontWeight: "bold"}}>{lineCount}</span>
                    <span> lines</span>
                </Space>
            </div>
            <div ref={ref} onScrollCapture={onScrollEvent} style={{flex: "auto", margin: 0, padding: 0}}>
                <textarea value={finalMessage} style={ConsoleStyle} readOnly/>
            </div>
        </CardX>
    )
}


export default DebugLogPage;