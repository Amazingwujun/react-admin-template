import {FormOutlined, ProfileOutlined, ToolOutlined, UserOutlined, WindowsOutlined} from '@ant-design/icons';
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
    getItem('餐厅', '/restaurant/info', <WindowsOutlined/>),
    getItem('用户中心', '/user-center', <UserOutlined/>, [
        getItem('租户管理', '/admin/tenant'),
        getItem('部门管理', '/admin/dept'),
        getItem('用户管理', '/admin/user'),
        getItem('角色管理', '/admin/role'),
        getItem('资源管理', '/admin/resource'),
        getItem('审计日志', '/admin/auditLog'),
        getItem('应用日志', '/admin/debugLog'),
    ]),
    {type: 'divider'},
    getItem('表单上传', '/formUpload', <FormOutlined/>),
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