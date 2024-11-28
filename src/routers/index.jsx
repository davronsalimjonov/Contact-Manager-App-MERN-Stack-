import { useSelector } from "react-redux";
import Chat from "@/components/pages/Chat";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Loader from "@/components/UI/atoms/Loader";
import Settings from "@/components/pages/Settings";
import Dashboard from "@/components/pages/Dashboard";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { callMentorSidebarLinks, mainMentorSidebarLinks, managerSidebarLinks } from "./data";
import Schedule from "@/components/pages/Schedule";
import SingleSchedule from "@/components/pages/SingleSchedule";

const callTecherRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={callMentorSidebarLinks} />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: '/students',
                element: <MyStudents />
            },
            {
                path: '/workspace',
                element: <Workspace />
            },
            {
                path: '/students',
                element: <MyStudents />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
            {
                path: '/lesson-schedule',
                element: <Schedule />
            },
            {
                path: '/lesson-schedule/:scheduleId',
                element: <SingleSchedule />
            },
            {
                path: '/lesson-schedule',
                element: <Schedule />
            },
            {
                path: '/lesson-schedule/:scheduleId',
                element: <SingleSchedule />
            },
            {
                path: '/students/chat/:chatId',
                element: <Chat />
            },
            {
                path: '/workspace',
                element: <Workspace />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    },
])

const mainMentorRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={mainMentorSidebarLinks} />,
        children: [
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
])

const managerRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={managerSidebarLinks} />,
        children: [
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
])

const authRoutes = createBrowserRouter([
    {
        path: '',
        element: <Login />
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
])

const loadingRoute = createBrowserRouter([
    {
        path: '*',
        element: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Loader />
            </div>
        )
    }
])

const emptyRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [{ path: '*', element: <PageNotFound /> }]
    }
])

const Routers = () => {
    const { isAuth } = useSelector(state => state.auth)
    const { data: user, isLoading: isUserLoading } = useGetUser()

    const getRoutesByRole = (role) => {
        switch (role) {
            case 2: return mainMentorRoutes;
            case 4: return callTecherRoutes;
            case 6: return managerRoutes
            default: return emptyRoute;
        }
    }

    return (isUserLoading ? (
        <RouterProvider router={loadingRoute} />
    ) : (
        <RouterProvider router={isAuth ? getRoutesByRole(user?.role) : authRoutes} />
    ))
}

export default Routers;