import MainLayout from "@/components/templates/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <></>
            }
        ]
    },
    {
        path: '*',
        element: <></>,
    }
])

const Routers = () => {
    return <RouterProvider router={router} />
}

export default Routers;
