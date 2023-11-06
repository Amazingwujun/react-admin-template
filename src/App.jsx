import {createBrowserRouter, RouterProvider} from "react-router-dom";
import useUserStore from "./store/useUserStore.js";
import './App.css'
import {USER_INFO_KEY} from "./const/common.js";
import router from "./route/router.jsx";
import repository from "./utils/repository.js";

function App() {
    // 检查 local storage
    let userInfoStr = repository.get(USER_INFO_KEY);
    if (userInfoStr) {
        let {authState, username} = JSON.parse(userInfoStr);
        const updateAuthState = useUserStore(t => t.updateAuthState);
        const updateUsername = useUserStore(t => t.updateUsername);

        updateAuthState(authState);
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
