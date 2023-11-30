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
    getItem('设备中心', '/general-template/device-center', <ProfileOutlined/>, [
        getItem('设备列表', '/general-template/device/info'),
        getItem('实时地图', '/general-template/device/map'),
    ]),
    getItem('餐厅', '/general-template/restaurant/info', <WindowsOutlined/>),
    getItem('用户中心', '/general-template/user-center', <UserOutlined/>, [
        getItem('租户管理', '/general-template/admin/tenant'),
        getItem('部门管理', '/general-template/admin/dept'),
        getItem('用户管理', '/general-template/admin/user'),
        getItem('角色管理', '/general-template/admin/role'),
        getItem('资源管理', '/general-template/admin/resource'),
        getItem('审计日志', '/general-template/admin/auditLog'),
        getItem('应用日志', '/general-template/admin/debugLog'),
    ]),
    {type: 'divider'},
    getItem('表单上传', '/general-template/formUpload', <FormOutlined/>),
    getItem('测试页面', '/general-template/test', <ToolOutlined/>)
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