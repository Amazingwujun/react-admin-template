import {ProfileOutlined, ToolOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import useUserStore from "../store/useUserStore.js";
import {useLocation, useNavigate} from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('设备中心', '/device-center', <ProfileOutlined/>, [
        getItem('设备列表', '/device/info'),
        getItem('实时地图', '/device/map'),
    ]),
    getItem('用户中心', '/user-center', <UserOutlined/>, [
        getItem('租户管理', '/admin/tenant'),
        getItem('用户管理', '/admin/user'),
        getItem('资源管理', '/admin/resource'),
        getItem('审计日志', '/admin/auditLog'),
    ]),
    {type: 'divider'},
    getItem('测试页面', '/test', <ToolOutlined/>)
];

function LeftBar() {
    const collapsed = useUserStore(t => t.collapsed);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    console.log(`pathname: [${pathname}]`)
    let key = pathname;
    if (pathname === '/') {
        // 默认索引页
        key = '/device/map';
    }

    const onClick = (e) => {
        navigate(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                maxWidth: 210,
            }}
            inlineCollapsed={collapsed}
            selectedKeys={[key]}
            mode="inline"
            items={items}
        />
    )
}

export default LeftBar;