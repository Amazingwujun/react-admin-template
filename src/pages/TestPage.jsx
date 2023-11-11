import {Button, Flex, Space} from "antd";
import {useWebSocket} from "ahooks";
import {useState} from "react";
import CardX from "../components/CardX.jsx";
import repository from "../utils/repository.js";
import {USER_INFO_KEY} from "../const/common.js";


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

function TestPage() {
    const userInfo = repository.get(USER_INFO_KEY);
    let token;
    if (userInfo) {
        token = JSON.parse(userInfo).token;
    }

    const [messages, setMessages] = useState('');
    const {readyState, sendMessage, latestMessage, disconnect, connect} = useWebSocket(
        `ws://192.168.32.35:18988/user-admin/debug-log?x-token=${token}`, {
            onMessage: message => {
                setMessages(messages.concat(message.data))
            }
        }
    );

    function doConnect(){
        console.log(readyState)
        if (readyState === ReadyState.Closed && connect) {
            connect();
            return
        }
        if (readyState === ReadyState.Open && disconnect) {
            console.log('disconnect')
            disconnect();
        }
    }

    return (
        <CardX title='应用日志'>
            <Flex style={{height: 50}} align='center' justify={"flex-end"}>
                <Space>
                    <Button type='primary' onClick={doConnect}>{stateStr(readyState)}</Button>
                    <Button type='primary' onClick={() => setMessages('')}>清空日志</Button>
                </Space>
            </Flex>
            <div style={{flex: "auto"}}>
                <textarea value={messages} style={ConsoleStyle} wrap readOnly/>
            </div>
        </CardX>
    )
}


export default TestPage;