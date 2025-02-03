import { useSelector } from "react-redux";
import Chat from "@/components/pages/Chat";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Loader from "@/components/UI/atoms/Loader";
import Settings from "@/components/pages/Settings";
import Dashboard from "@/components/pages/Dashboard";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import MentorTasks from "@/components/pages/MentorTasks";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { callMentorSidebarLinks, mainMentorSidebarLinks, managerSidebarLinks, sellerSidebarLinks } from "./data";
import SellersDashboard from "@/components/pages/SellersDashboard";
import SellerWorkspace from "@/components/pages/SellerWorkspace";
import SellerStatistics from "@/components/pages/SellerStatistics";
import SellerStudents from "@/components/pages/SellerStudents";
import { MessageTypes } from "@/constants/enum";
import SalesForm from "@/components/pages/SalesForm";
import SinglePageLayout from "@/components/templates/SinglePageLayout";
import AdaptationWorkspace from "@/components/pages/AdaptationWorkspace";
import Materials from "@/components/pages/Materials";
import SellerChecks from "@/components/pages/SellerChecks";
import LessonsSchedule from "@/components/pages/LessonsSchedule";
import Groups from "@/components/pages/Groups";
import StudentCourseInfo from "@/components/pages/StudentCourseInfo";
import SingleGroup from "@/components/pages/SingleGroup";
import LessonPlan from "@/components/pages/LessonPlan";

const sellerAllowedMessagesTypes = [MessageTypes.COMMENT]

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
                path: '/adaptation-workspace',
                element: <AdaptationWorkspace />
            },
            {
                path: '/adaptation-workspace/:courseId/:userId',
                element: <StudentCourseInfo />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/tasks',
                element: <MentorTasks />
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
                path: '/lessons-schedule',
                element: <LessonsSchedule />
            },
            {
                path: '/materials',
                element: <Materials />
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
                path: '/groups',
                element: <Groups />
            },
            {
                path: '/groups/:groupId',
                element: <SingleGroup />
            },
            {
                path: '/groups/:groupId/lesson-schedule',
                element: <LessonPlan />
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
])

const sellerRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={sellerSidebarLinks} />,
        children: [
            {
                path: '/',
                element: <SellersDashboard />
            },
            {
                path: '/dashboard',
                element: <SellerStatistics />
            },
            {
                path: '/students',
                element: <SellerStudents />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat allowedMessagesTypes={sellerAllowedMessagesTypes} />
            },
            {
                path: '/workspace',
                element: <SellerWorkspace />
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
    {
        path: '',
        element: <SinglePageLayout />,
        children: [
            {
                path: '/sales-form',
                element: <SalesForm />
            },
            {
                path: '/checks',
                element: <SellerChecks />
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
            case 6: return managerRoutes;
            case 5: return sellerRoutes;
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