import MyStudents from "@/components/pages/MyStudents";
import Settings from "@/components/pages/Settings";
import SingleStudent from "@/components/pages/SingleStudent";
import Workspace from "@/components/pages/Workspace";
import MainLayout from "@/components/templates/MainLayout";
import NotFound from "@/components/UI/moleculs/NotFound";
import Main from "@/components/UI/organisms/Main";
import Settings from "@/components/UI/organisms/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
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

const Routers = () => {
    return <RouterProvider router={router} />
}

export default Routers;
