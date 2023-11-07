import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';
import {Button, Card} from "antd";

function TestPage() {
    return (
        <Card className='full-container' title='百度地图'>
            <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11" style={{height: '100%'}}>
                <Marker position={{lng: 116.402544, lat: 39.928216}} />
                <NavigationControl />
                <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
            </Map>
        </Card>
    )
}


export default TestPage;