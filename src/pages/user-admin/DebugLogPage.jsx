import {Badge, Button, Input, Select, Space} from "antd";
import {useWebSocket} from "ahooks";
import {useLayoutEffect, useRef, useState} from "react";
import CardX from "../../components/CardX.jsx";
import repository from "../../utils/repository.js";
import {USER_INFO_KEY} from "../../const/common.js";

const ConsoleStyle = {
    resize: 'none',
    height: '100%',
    width: '100%',
    fontFamily: 'consolas',
    color: '#F2F2F2',
    background: "#0C0C0C",
    borderRadius: 5,
    fontSize: 15,
    padding: '0px 5px',
}

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3,
}

function stateStr(readyState) {
    switch (readyState) {
        case ReadyState.Connecting:
            return '连接中...'
        case ReadyState.Open:
            return '断开连接'
        case ReadyState.Closing:
            return '关闭中...'
        case ReadyState.Closed:
            return '发起连接'
    }
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
    const [prefix, setPrefix] = useState('ws://');
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
        `${prefix}${url}?x-token=${token}`, {
            manual: true,
            onOpen: () => {
                setMessages(messages.concat(`'<span style="color: lawngreen">'成功连接至 ${prefix}${url}'</span>'\r\n`));
                ref.current.scrollTop = ref.current.scrollHeight;
            },
            onMessage: message => {
                setMessages(messages.concat(message.data))
            },
            onClose: () => {
                setMessages(messages.concat(`与 ${prefix}${url} 的连接被断开 \r\n`));
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }
    );

    const onScrollEvent = (event) => {
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        console.log('scroll')
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
            setAutoScrollToBottom(true);
        } else {
            setAutoScrollToBottom(false);
        }
    }

    const selectBefore = (
        <Select value={prefix} onChange={e => setPrefix(e)}>
            <Select.Option value="ws://">ws://</Select.Option>
            <Select.Option value="wss://">wss://</Select.Option>
        </Select>
    );

    function actions() {
        return (
            <Space align='center'>
                <Badge status={statusColor(readyState)}></Badge>
                <Input value={url} addonBefore={selectBefore} onChange={e => setUrl(e.target.value)}
                       style={{width: 400}}/>
                <Button type='primary' onClick={connect}>发起连接</Button>
                <Button type='primary' onClick={disconnect}>断开连接</Button>
                <Button type='primary' onClick={() => setMessages('')}>清空日志</Button>
            </Space>
        )
    }

    return (
        <CardX title='应用日志' extra={actions()}>
            <div ref={ref} onScrollCapture={onScrollEvent} style={{flex: "auto", margin: 0, padding: 0}}>
                <textarea className='scroll-perf' value={messages} style={ConsoleStyle} readOnly/>
            </div>
        </CardX>
    )
}


export default DebugLogPage;