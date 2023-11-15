import {Avatar, Dropdown, Flex, Image, Space} from "antd";
import useUserStore from "../store/useUserStore.js";
import {UserOutlined} from "@ant-design/icons";
import logo from "../assets/react.svg"
import {USER_INFO_KEY} from "../const/common.js";
import repository from "../utils/repository.js";

const items = [
    {
        label: "退出登入",
        key: '0',
    },
];

function Header() {
    const updateAuth = useUserStore(t => t.updateAuthState);

    const onClick = ({key}) => {
        if (key === '0') {
            // 退出登入
            updateAuth(false);
            // 清理 localstorage
            repository.remove(USER_INFO_KEY);
        }
    }

    return (
        <Flex justify='space-between' align='center'
              style={{height: 59, background: '#fff', marginBottom: 2, paddingLeft: 20, paddingRight: 20}}>
            <Space>
                <Image
                    width={40}
                    preview={false}
                    src={logo}
                />
                <span style={{fontSize: 25}}>React Admin</span>
            </Space>
            <Space>
                <Dropdown
                    menu={{items, onClick}}
                    trigger={["hover"]}
                >
                    <Avatar shape="circle" style={{cursor: "pointer"}} icon={<UserOutlined/>}/>
                </Dropdown>
            </Space>
        </Flex>
    )
}

export default Header;