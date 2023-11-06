import Main from "../layout/Main.jsx";
import SignInPage from "../pages/user-admin/SigInPage.jsx";
import UserPage from "../pages/user-admin/UserPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TestPage from "../pages/TestPage.jsx";
import TenantPage from "../pages/user-admin/TenantPage.jsx";
import ResourcePage from "../pages/user-admin/ResourcePage.jsx";

const router = [
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <UserPage/>
            },
            {
                path: '/user',
                element: <UserPage/>
            },
            {
                path: '/tenant',
                element: <TenantPage/>
            },
            {
              path: '/resource',
              element: <ResourcePage/>
            },
            {
                path: '/test',
                element: <TestPage/>
            }
        ]
    },
    {
        path: '/signIn',
        element: <SignInPage/>
    }
];

export default router;
