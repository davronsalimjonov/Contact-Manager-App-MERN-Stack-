import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '*',
        element: <></>,
    }
])

const Routers = () => {
    return <RouterProvider router={router} />
}

export default Routers;
