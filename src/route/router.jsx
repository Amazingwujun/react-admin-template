import Main from "../layout/Main.jsx";
import SignInPage from "../pages/user-admin/SigInPage.jsx";
import UserPage from "../pages/user-admin/UserPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TestPage from "../pages/TestPage.jsx";
import TenantPage from "../pages/user-admin/TenantPage.jsx";
import ResourcePage from "../pages/user-admin/ResourcePage.jsx";
import AuditLogPage from "../pages/user-admin/AuditLogPage.jsx";
import DevicePage from "../pages/lampblack/DevicePage.jsx";
import DeviceDataPage from "../pages/lampblack/DeviceDataPage.jsx";
import DeviceMapPage from "../pages/lampblack/DeviceMapPage.jsx";
import DebugLogPage from "../pages/user-admin/DebugLogPage.jsx";

const router = [
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <DeviceMapPage/>
            },
            {
                path: '/device',
                children: [
                    {
                        path: '/device/info',
                        element: <DevicePage/>
                    },
                    {
                        path: '/device/:deviceMn',
                        element: <DeviceDataPage/>
                    },
                    {
                        path: '/device/map',
                        element: <DeviceMapPage/>
                    },
                ]
            },
            {
                path: '/admin',
                children: [
                    {
                        path: '/admin/user',
                        element: <UserPage/>
                    },
                    {
                        path: '/admin/tenant',
                        element: <TenantPage/>
                    },
                    {
                        path: '/admin/resource',
                        element: <ResourcePage/>
                    },
                    {
                        path: '/admin/auditLog',
                        element: <AuditLogPage/>
                    },
                    {
                        path: '/admin/debugLog',
                        element: <DebugLogPage/>
                    }
                ]
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
