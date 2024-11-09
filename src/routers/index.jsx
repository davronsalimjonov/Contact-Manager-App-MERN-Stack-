import MainLayout from "@/components/templates/MainLayout";
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
                path: '/settings',
                element: <Settings />,
            }
        ]
    },
])

const Routers = () => {
    return <RouterProvider router={router} />
}

export default Routers;
