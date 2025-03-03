import Loader from "@/components/UI/atoms/Loader";
import { createBrowserRouter } from "react-router-dom";

const loadingRoutes = createBrowserRouter([
    {
        path: '*',
        element: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Loader />
            </div>
        )
    }
])

export default loadingRoutes;