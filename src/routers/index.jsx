import { useSelector } from "react-redux";
import Chat from "@/components/pages/Chat";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Loader from "@/components/UI/atoms/Loader";
import Settings from "@/components/pages/Settings";
import Dashboard from "@/components/pages/SupervisorDashboard";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import MentorTasks from "@/components/pages/MentorTasks";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { callMentorSidebarLinks, mainMentorSidebarLinks, managerSidebarLinks } from "./data";
import Schedule from "@/components/pages/Schedule";
import SingleSchedule from "@/components/pages/SingleSchedule";
import MainMentor from "@/components/pages/MainMentorDashboard";
import MainMentorStudents from "@/components/pages/MainMentorStudents";
import Users from "@/components/pages/Users";
import SingleUser from "@/components/pages/SingleUser";
import MainMentors from "@/components/pages/MainMentors";
import MainMentorStatistic from "@/components/pages/MainMentorStatistic";
import CallMentors from "@/components/pages/CallMentors";
import CallMentorStatistic from "@/components/pages/CallMentorsStatistic";
import AllStudents from "@/components/pages/AllStudents";
import Courses from "@/components/pages/Courses";
import AddStudent from "@/components/pages/AddStudent";
import UpdateSingleStudentCourse from "@/components/pages/UpdateSingleStudentCourse";
import UpdateCourse from "@/components/pages/UpdateCourse";
import ServisStatistic from "@/components/pages/ServisStatistic";
import StudentsRateForCallMentor from "@/components/pages/StudentsRateForCallMentor";
import StudentsRateForTeacher from "@/components/pages/StudentsRateForTeachers";
import Dictionary from "@/components/pages/Dictionary";
import Moderation from "@/components/pages/Moderation";
import MentorsStatistic from "@/components/pages/MentorsStatistic";
import Notification from "@/components/pages/Notification";
import AddNotification from "@/components/pages/AddNotification";
import AcademicManager from "@/components/pages/AcademicManager";

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
                path: '/dictionary',
                element: <Dictionary />
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
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/tasks',
                element: <MentorTasks />
            },
            {
                path: 'mentor',
                element: <MainMentors />
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
                path: '',
                element: <MainMentor />
            },
            {
                path: '/students',
                element: <MainMentorStudents />
            },
            {
                path: '/dictionary',
                element: <Dictionary />
            },
            {
                path: '/lessons-schedule',
                element: <Schedule />
            },
            {
                path: '/lessons-schedule/:scheduleId',
                element: <SingleSchedule />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
            {
                path: '*',
                element: <PageNotFound />
            },
        ]
    }
])

const managerRoutes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={managerSidebarLinks} />,
        children: [
            {
                path: '/',
                element: <AcademicManager />
            },
            {
                path: '/main-teachers',
                element: <MainMentors />
            },
            {
                path: '/main-teachers/:mentorId',
                element: <MainMentorStatistic />
            },
            {
                path: '/call-teachers',
                element: <CallMentors />
            },
            {
                path: '/call-teachers/:mentorId',
                element: <CallMentorStatistic />
            },
            {
                path: '/students',
                element: <AllStudents />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
            {
                path: '/add-student',
                element: <AddStudent />
            },
            {
                path: '/update-course/:courseId',
                element: <UpdateSingleStudentCourse />
            },
            {
                path: '/courses',
                element: <Courses />
            },
            {
                path: '/courses/:courseId',
                element: <UpdateCourse />
            },
            {
                path:'/notifications',
                element: <Notification/>
            },
            {
                path:'/notifications/add',
                element: <AddNotification/>
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/service-statistics',
                element: <ServisStatistic />
            },
            {
                path: '/service-statistics/lesson-rate/:teacherId/:groupId',
                element: <StudentsRateForTeacher />
            },
            {
                path: '/service-statistics/call-rate/:teacherId',
                element: <StudentsRateForCallMentor />
            },
            {
                path: '/dictionary',
                element: <Dictionary />
            },
            {
                path: '/moderation/:courseId',
                element: <Moderation />
            },
            {
                path: '/mentor-statistics',
                element: <MentorsStatistic />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/user/:userId',
                element: <SingleUser />
            },
            {
                path: '*',
                element: <PageNotFound />
            },
        ]
    }
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
            case 6: return managerRoutes
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