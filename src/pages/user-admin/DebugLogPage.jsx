import {Badge, Button, Input, message, Select, Space} from "antd";
import {useWebSocket} from "ahooks";
import {useLayoutEffect, useReducer, useRef, useState} from "react";
import CardX from "../../components/CardX.jsx";
import repository from "../../utils/repository.js";
import {USER_INFO_KEY} from "../../const/common.js";

const ActionType = {
    CLEAR: 0,
    NEW_MESSAGE: 1
}

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

function msgReduce(state, action) {
    if (action.type === ActionType.CLEAR) {
        return "";
    }
    return state + action.data;
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

    const [messages, dispatch] = useReducer(msgReduce, "");
    const {readyState, disconnect, connect} = useWebSocket(
        `${prefix}${url}?x-token=${token}`, {
            manual: true,
            onOpen: () => {
                message.success("连接成功")
            },
            onMessage: message => {
                dispatch({data: message.data})
            },
            onClose: () => {
                message.warning("连接已断开")
            }
        }
    );

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
                <Button type='primary' onClick={() => dispatch({type: ActionType.CLEAR})}>清空日志</Button>
            </Space>
        )
    }

    return (
        <CardX title='应用日志' extra={actions()}>
            <div ref={ref} onScrollCapture={onScrollEvent} style={{flex: "auto", margin: 0, padding: 0}}>
                <textarea value={messages} style={ConsoleStyle} readOnly/>
            </div>
        </CardX>
    )
}


export default DebugLogPage;