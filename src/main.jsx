import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from "dayjs";

dayjs.locale('zh');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 2,
                },
            }}
            locale={zhCN}
        >
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
)
