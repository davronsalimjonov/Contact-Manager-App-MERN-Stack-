import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/components/pages/Login";

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

export default authRoutes;