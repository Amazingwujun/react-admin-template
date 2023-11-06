import {AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import useUserStore from "../store/useUserStore.js";
import {useNavigate} from "react-router-dom";

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
    getItem('用户中心', '/user', <UserOutlined/>, [
        getItem('用户管理', '/user'),
        getItem('租户管理', '/tenant'),
        getItem('资源管理', '/resource')
    ]),
];

function LeftBar() {
    const collapsed = useUserStore(t => t.collapsed);
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                maxWidth: 256,
            }}
            inlineCollapsed={collapsed}
            defaultSelectedKeys={['/tenant']}
            mode="inline"
            items={items}
        />
    )
}

export default LeftBar;