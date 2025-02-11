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
// import Schedule from "@/components/pages/Schedule";
// import SingleSchedule from "@/components/pages/SingleSchedule";
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
// import Notification from "@/components/pages/Notification";
// import AddNotification from "@/components/pages/AddNotification";
import AcademicManager from "@/components/pages/AcademicManager";
import SellersDashboard from "@/components/pages/SellersDashboard";
import SellerWorkspace from "@/components/pages/SellerWorkspace";
import SellerStatistics from "@/components/pages/SellerStatistics";
import SellerStudents from "@/components/pages/SellerStudents";
import { MessageTypes } from "@/constants/enum";
import SalesForm from "@/components/pages/SalesForm";
import AllMentors from "@/components/pages/AllMentors";
import SinglePageLayout from "@/components/templates/SinglePageLayout";
import AdaptationWorkspace from "@/components/pages/AdaptationWorkspace";
import Materials from "@/components/pages/Materials";
import SellerChecks from "@/components/pages/SellerChecks";
import LessonsSchedule from "@/components/pages/LessonsSchedule";
import SingleMentor from "@/components/pages/SingleMentor";
import CoursesIFrame from "@/components/pages/CoursesIFrame";
import { callMentorSidebarLinks, mainMentorSidebarLinks, managerSidebarLinks, sellerSidebarLinks } from "./data";
import ScheduleDetails from "@/components/pages/ScheduleDetails";
import Groups from "@/components/pages/Groups";
import ScheduleHomeWork from "@/components/pages/ScheduleHomeWork";
import SingleGroup from "@/components/pages/SingleGroup";
import LessonPlan from "@/components/pages/LessonPlan";
import UserCourseUpdate from "@/components/pages/UserCourseUpdate";
import ScheduleHomeworkCreate from "@/components/pages/ScheduleHomeWorkCreate";
import ScheduleHomeWorkDetails from "@/components/pages/ScheduleHomeWorkDetails";
import { USER_ROLES } from "@/constants";
import { useMemo } from "react";

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
                path: '/students/:courseId/:userId',
                element: <SingleStudent />
            },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat />
            },
            {
                path: '/user-course/:userCourseId',
                element: <UserCourseUpdate />
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
                path: '/adaptation-workspace',
                element: <AdaptationWorkspace />
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
                path: '',
                element: <MainMentor />
            },
            {
                path: '/materials',
                element: <Materials />
            },
            {
                path: '/students',
                element: <MainMentorStudents />
            },
            {
                path: '/students/:courseId/:userId',
                element: <SingleStudent />
            },
            {
                path: '/user-course/:userCourseId',
                element: <UserCourseUpdate />
            },
            {
                path: '/dictionary',
                element: <Dictionary />
            },
            {
                path: '/lessons-schedule',
                element: <LessonsSchedule />
            },
            {
                path: '/lessons-schedule/:groupId',
                element: <ScheduleDetails />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId',
                element: <ScheduleHomeWork />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId/create-homework',
                element: <ScheduleHomeworkCreate />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId/homework/:homeworkId',
                element: <ScheduleHomeWorkDetails />
            },
            // {
            //     path: '/lessons-schedule',
            //     element: <Schedule />
            // },
            // {
            //     path: '/lessons-schedule/:scheduleId',
            //     element: <SingleSchedule />
            // },
            // {
            //     path: '/schedule/table',
            //     element: <ScheduleHomeWork />
            // },
            {
                path: '/platform',
                element: <CoursesIFrame />
            },
            {
                path: '/settings',
                element: <Settings />
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
                path: '/students/:courseId/:userId',
                element: <SingleStudent />
            },
            {
                path: '/user-course/:userCourseId',
                element: <UserCourseUpdate />
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
            // {
            //     path:'/notifications',
            //     element: <Notification/>
            // },
            // {
            //     path:'/notifications/add',
            //     element: <AddNotification/>
            // },
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
            // {
            //     path: '/dictionary',
            //     element: <Dictionary />
            // },
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
                path: '/mentors',
                element: <AllMentors />
            },
            {
                path: '/mentors/:mentorId',
                element: <SingleMentor />
            },
            {
                path: '/mentors/add-mentor',
                element: <SingleMentor />
            },
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
            },
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
    const { isAuth } = useSelector(state => state.auth);
    const { data: user, isLoading: isUserLoading } = useGetUser();

    const getRoutesByRole = (role) => {
        switch (role) {
            case USER_ROLES.MAIN_MENTOR: return mainMentorRoutes;
            case USER_ROLES.CALL_MENTOR: return callTecherRoutes;
            case USER_ROLES.ACADEMY_MANAGER: return managerRoutes;
            case USER_ROLES.SELLER: return sellerRoutes;
            default: return emptyRoute;
        }
    };

    const router = useMemo(() => {
        if (isUserLoading) {
            return loadingRoute;
        }
        return isAuth ? getRoutesByRole(user?.role) : authRoutes;
    }, [isUserLoading, isAuth, user?.role]);

    return (
        <RouterProvider
            key={isUserLoading ? "loading" : user?.role || "unauthenticated"}
            router={router}
            // future={{ v7_startTransition: true }}
        />
    );
};

export default Routers;
