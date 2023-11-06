import {createBrowserRouter, RouterProvider} from "react-router-dom";
import useUserStore from "./store/useUserStore.js";
import './App.css'
import {USER_INFO_KEY} from "./const/common.js";
import router from "./route/router.jsx";

function App() {
    // 检查 local storage
    let userInfoStr = sessionStorage.getItem(USER_INFO_KEY) || localStorage.getItem(USER_INFO_KEY);
    if (userInfoStr) {
        let {hasAuth, username, token} = JSON.parse(userInfoStr);
        const updateAuth = useUserStore(t => t.updateAuthState);
        const updateToken = useUserStore(t => t.updateToken);
        const updateUsername = useUserStore(t => t.updateUsername);

        updateAuth(hasAuth);
        updateToken(token);
        updateUsername(username);
    }

    // 创建路由
    const browserRouter = createBrowserRouter(router);

    return (
        <>
            <RouterProvider router={browserRouter}/>
        </>
    );
}

export default App
