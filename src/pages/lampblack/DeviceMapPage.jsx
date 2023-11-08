import {InfoWindow, Map} from 'react-bmapgl';
import {Button, Card, Divider} from "antd";
import {useRef, useState} from "react";
import {useRequest} from "ahooks";
import {listForScreen} from "../../client/lampblack/device.js";
import {COMMON_ERR_HANDLE} from "../../client/client.js";
import useUserStore from "../../store/useUserStore.js";
import {useNavigate} from "react-router-dom";
import {WindowsOutlined} from "@ant-design/icons";
import offlineSvg from '../../assets/vite.svg'
import onlineSvg from '../../assets/react.svg'

const absoluteBox = {
    zIndex: 1000,
    position: 'absolute',
    width: 400,
    height: 400,
    top: 48,
    right: 48
}


function DeviceMapPage() {
    const mapRef = useRef();
    const navigate = useNavigate();
    const updateAuthState = useUserStore(t => t.updateAuthState);
    const [showInfo, setShowInfo] = useState();

    useRequest(listForScreen, {
        onError: e => COMMON_ERR_HANDLE(e, navigate, updateAuthState),
        onSuccess: data => {
            let offlineIcon = new BMapGL.Icon(offlineSvg, {width: 23, height: 40});
            let onlineIcon = new BMapGL.Icon(onlineSvg, {width: 23, height: 40});
            for (const item of data) {
                const point = new BMapGL.Point(item.longitude, item.latitude);
                let marker;
                if (item.onlineFlag) {
                    marker = new BMapGL.Marker(point, {icon: onlineIcon});
                } else {
                    marker = new BMapGL.Marker(point, {icon: offlineIcon});
                }
                mapRef.current.addOverlay(marker);

                // 事件监听
                marker.addEventListener('click', () => setShowInfo(item));
            }
        }
    })

    function showInfoWindow() {
        if (showInfo) {
            return (
                <InfoWindow
                    position={{lng: showInfo.longitude, lat: showInfo.latitude}}
                    title={`${showInfo.restaurantName} / ${showInfo.mn}`}
                    width={300}
                    height={100}
                >
                    <Divider style={{marginTop: 0}}/>
                    <Button type='primary' icon={<WindowsOutlined/>}>测试按钮</Button>
                </InfoWindow>
            )
        }
        return null;
    }

    return (
        <div className='full-container'
             style={{background: '#ffffff', display: "flex", flexDirection: "column", borderRadius: 2}}>
            <div style={{height: 56, padding: 24, display: "flex", justifyContent: 'flex-start', alignItems: 'center'}}>
                <span style={{fontSize: 16, fontWeight: 600}}>
                    百度地图
                </span>
            </div>
            <Divider style={{margin: 0}}/>
            <div style={{flex: 1, padding: 24, position: 'relative'}}>
                <Map ref={ref => mapRef.current = ref?.map} center={{lng: 120.975422, lat: 31.393516}} zoom="11"
                     enableDragging
                     enableScrollWheelZoom
                     enableDoubleClickZoom
                     style={{height: '100%', width: '100%'}}>
                    {showInfoWindow()}
                </Map>
                <Card title='绝对定位卡' style={{...absoluteBox, opacity: 0.9}}>
                    <span>for test</span>
                </Card>
            </div>
        </div>
    )
}


export default DeviceMapPage;