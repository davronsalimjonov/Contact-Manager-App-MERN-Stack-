import { useSelector } from "react-redux";
import Chat from "@/components/pages/Chat";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Loader from "@/components/UI/atoms/Loader";
import Settings from "@/components/pages/Settings";
import Dashboard from "@/components/pages/SupervisorDashboard";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { callMentorSidebarLinks, mainMentorSidebarLinks, managerSidebarLinks } from "./data";
import MainMentor from "@/components/pages/MainMentorDashboard";
import MainMentorStudents from "@/components/pages/MainMentorStudents";
import Users from "@/components/pages/Users";
import SingleUser from "@/components/pages/SingleUser";
import AcademicManager from "@/components/pages/AcademicManager";
import AllMentors from "@/components/pages/AllMentors";
import SingleMentor from "@/components/pages/SingleMentor";

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
                path: '/students/chat/:userCourseId',
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
                path: '',
                element: <MainMentor />
            },
            {
                path: '/students',
                element: <MainMentorStudents />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
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
            },
            {
                path: '/',
                element: <AcademicManager />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/user/:userId',
                element: <SingleUser />
            },
            {
                path: '/mentors',
                element: <AllMentors />
            },
            {
                path: '/mentors/mentor/:mentorId?:mentorRole',
                element: <SingleMentor />
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