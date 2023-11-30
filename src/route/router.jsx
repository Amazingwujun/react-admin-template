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
import RestaurantPage from "../pages/lampblack/RestaurantPage.jsx";
import DebugLogPage from "../pages/user-admin/DebugLogPage.jsx";
import DeptPage from "../pages/user-admin/DeptPage.jsx";
import RolePage from "../pages/user-admin/RolePage.jsx";
import FormUploadPage from "../pages/FormUploadPage.jsx";

const router = [
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/general-template',
                children: [
                    {
                        index: true,
                        element: <UserPage/>
                    },
                    {
                        path: '/general-template/device',
                        children: [
                            {
                                path: '/general-template/device/info',
                                element: <DevicePage/>
                            },
                            {
                                path: '/general-template/device/:deviceMn',
                                element: <DeviceDataPage/>
                            },
                            {
                                path: '/general-template/device/map',
                                element: <DeviceMapPage/>
                            },
                        ]
                    },
                    {
                        path: '/general-template/restaurant/info',
                        element: <RestaurantPage/>
                    },
                    {
                        path: '/general-template/admin',
                        children: [
                            {
                                path: '/general-template/admin/user',
                                element: <UserPage/>
                            },
                            {
                                path: '/general-template/admin/role',
                                element: <RolePage/>
                            },
                            {
                                path: '/general-template/admin/tenant',
                                element: <TenantPage/>
                            },
                            {
                                path: '/general-template/admin/dept',
                                element: <DeptPage/>
                            },
                            {
                                path: '/general-template/admin/resource',
                                element: <ResourcePage/>
                            },
                            {
                                path: '/general-template/admin/auditLog',
                                element: <AuditLogPage/>
                            },
                            {
                                path: '/general-template/admin/debugLog',
                                element: <DebugLogPage/>
                            }
                        ]
                    },
                    {
                        path: '/general-template/formUpload',
                        element: <FormUploadPage/>
                    },
                    {
                        path: '/general-template/test',
                        element: <TestPage/>
                    }
                ]
            },
            {
                path: '/general-template/signIn',
                element: <SignInPage/>
            }
        ]
    }
];

export default router;
