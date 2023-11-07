import {Card, Flex} from "antd";
import {useEffect} from "react";

function TestPage() {

    useEffect(() => {
        const BMapGL = window.BMapGL
        const map = new BMapGL.Map("container");
        const point = new BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true); //鼠标缩放
        var zoomCtrl = new BMapGL.ZoomControl();  // (地图右下角+ - 缩放按钮) 添加缩放控件
        map.addControl(zoomCtrl);
    }, [])

    return (
        <Card className='full-container' title='测试页面'>
                <div id="container" className='full-container'>
                </div>
        </Card>
    )
}


export default TestPage;