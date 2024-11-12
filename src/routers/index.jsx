import { useSelector } from "react-redux";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Main from "@/components/UI/organisms/Main";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import NotFound from "@/components/UI/moleculs/NotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import Settings from "@/components/UI/organisms/Settings";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Main />
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
                path: '/students/:studentId',
                element: <SingleStudent />
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
                path: '/settings',
                element: <Settings />,
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
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

const Routers = () => {
    const user = useGetUser()
    const { isAuth } = useSelector(state => state.auth)

    return <RouterProvider router={isAuth ? privateRoutes : authRoutes} />
}

export default Routers;
