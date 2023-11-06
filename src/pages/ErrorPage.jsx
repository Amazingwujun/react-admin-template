import {Button, Result} from "antd";
import {useNavigate, useRouteError} from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <Result
            title={error.statusText}
            status={error.status}
            subTitle={error.data}
            extra={<Button type='primary' style={{minWidth: 250, height: 40}}
                           onClick={() => navigate('/')}>回到主页</Button>}
        />
    )
}


export default ErrorPage;