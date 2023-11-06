import Main from "../layout/Main.jsx";
import SignInPage from "../pages/SigInPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TestPage from "../pages/TestPage.jsx";

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
