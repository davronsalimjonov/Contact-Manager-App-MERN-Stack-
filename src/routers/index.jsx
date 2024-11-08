import MyStudents from "@/components/pages/MyStudents";
import Workspace from "@/components/pages/Workspace";
import MainLayout from "@/components/templates/MainLayout";
import Main from "@/components/UI/organisms/Main";
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
                path: '*',
                element: <></>,
            }
        ]
    },
])

const Routers = () => {
    return <RouterProvider router={router} />
}

export default Routers;
