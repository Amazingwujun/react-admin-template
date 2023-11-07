import {InfoWindow, Map} from 'react-bmapgl';
import {Button, Card, Divider} from "antd";
import {useRef, useState} from "react";
import {useRequest} from "ahooks";
import {listForScreen} from "../client/lampblack/device.js";
import {COMMON_ERR_HANDLE} from "../client/client.js";
import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {WindowsOutlined} from "@ant-design/icons";

function TestPage() {
    const mapRef = useRef();
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const [showInfo, setShowInfo] = useState();

    const {data} = useRequest(listForScreen, {
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
        onSuccess: data => {
            const BMapGL = window.BMapGL;
            console.log(BMapGL)
            for (const item of data) {
                const point = new BMapGL.Point(item.longitude, item.latitude);
                const marker = new BMapGL.Marker(point);
                mapRef.current.addOverlay(marker);

                // 事件监听
                marker.addEventListener('click', function () {
                    setShowInfo(item);
                });
            }
        }
    })

    function showInfoWindow() {
        if (showInfo) {
            return (
                <InfoWindow
                    position={{lng: showInfo.longitude, lat: showInfo.latitude}}
                    title="标题"
                    text="快速文本信息窗口"
                    width={400}
                    height={300}
                >
                    <Divider style={{marginTop: 0}}/>
                    <Button type='primary' icon={<WindowsOutlined/>}>测试按钮</Button>
                </InfoWindow>
            )
        }
        return null;
    }

    return (
        <Card className='full-container' title='百度地图'>
            <Map ref={ref => mapRef.current = ref?.map} center={{lng: 120.975422, lat: 31.393516}} zoom="11"
                 enableDragging
                 enableScrollWheelZoom
                 enableDoubleClickZoom
                 style={{height: '100%'}}>
                {showInfoWindow()}
            </Map>
        </Card>
    )
}


export default TestPage;