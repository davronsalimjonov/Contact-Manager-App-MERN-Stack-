import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { USER_ROLES } from "@/constants";
import useGetUser from "@/hooks/useGetUser";
import loadingRoutes from "./loading";
import emptyRoutes from "./empty";

const getRoutesByRole = async (role) => {
    try {
        switch (role) {
            case USER_ROLES.MAIN_MENTOR: {
                const { default: MainMentorRoutes } = await import('./mainMentor');
                return MainMentorRoutes();
            }
            case USER_ROLES.CALL_MENTOR: {
                const { default: CallMentorRoutes } = await import('./callMentor');
                return CallMentorRoutes();
            }
            case USER_ROLES.ACADEMY_MANAGER: {
                const { default: AcademyManagerRoutes } = await import('./academyManager');
                return AcademyManagerRoutes();
            }
            case USER_ROLES.SELLER: {
                const { default: SellerRoutes } = await import('./seller');
                return SellerRoutes();
            }
            default: return emptyRoutes
        }
    } catch (error) {
        console.error(`Failed to load routes for role: ${role}`, error);
        return loadingRoutes;
    }
};

const Routers = () => {
    const { isAuth } = useSelector(state => state.auth);
    const { data: user, isLoading: isUserLoading } = useGetUser();
    const [router, setRouter] = useState(loadingRoutes);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadRouter = async () => {
            if (isUserLoading) return;

            try {
                setIsLoading(true);
                if (isAuth && user?.role) {
                    const roleRouter = await getRoutesByRole(user.role);
                    setRouter(roleRouter);
                } else {
                    const { default: authRoutes } = await import('./auth');
                    setRouter(authRoutes);
                }
            } catch (error) {
                console.error('Failed to load routes:', error);
                setRouter(loadingRoutes);
            } finally {
                setIsLoading(false)
            }
        };

        loadRouter();
    }, [isAuth, user?.role, isUserLoading]);

    return (
        <RouterProvider router={isLoading ? loadingRoutes : router}  />
    )
};

export default Routers;
