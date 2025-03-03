import { useSelector } from "react-redux";
import Chat from "@/components/pages/Chat";
import useGetUser from "@/hooks/useGetUser";
import Login from "@/components/pages/Login";
import Loader from "@/components/UI/atoms/Loader";
import Settings from "@/components/pages/Settings";
import CallMentorDashboard from "@/components/pages/CallMentorDashboard";
import Workspace from "@/components/pages/Workspace";
import MyStudents from "@/components/pages/MyStudents";
import MentorTasks from "@/components/pages/MentorTasks";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SingleStudent from "@/components/pages/SingleStudent";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainMentorDashboard from "@/components/pages/MainMentorDashboard";
import MainMentorStudents from "@/components/pages/MainMentorStudents";
import Users from "@/components/pages/Users";
import SingleUser from "@/components/pages/SingleUser";
import MainMentors from "@/components/pages/MainMentorsStatistic";
import MainMentorStatistic from "@/components/pages/MainMentorStatistic";
import CallMentors from "@/components/pages/CallMentorsStatistic";
import CallMentorStatistic from "@/components/pages/CallMentorStatistic";
import AllStudents from "@/components/pages/AllStudents";
import Courses from "@/components/pages/Courses";
import UpdateSingleStudentCourse from "@/components/pages/UpdateSingleStudentCourse";
import UpdateCourse from "@/components/pages/UpdateCourse";
import Dictionary from "@/components/pages/Dictionary";
import Moderation from "@/components/pages/Moderation";
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
import Groups from "@/components/pages/Groups";
import SingleLesson from "@/components/pages/SingleLesson";
import SingleGroup from "@/components/pages/SingleGroup";
import LessonPlan from "@/components/pages/LessonPlan";
import GroupLessons from "@/components/pages/GroupLessons";
import UserCourseUpdate from "@/components/pages/UserCourseUpdate";
import HomeworkReview from "@/components/pages/HomeworkReview";
import MentorCardsProvider from "@/providers/MentorCardsProvider";
import CreateLessonHomework from "@/components/pages/CreateLessonHomework";
import AcademyAdaptationWorkspace from "@/components/pages/AcademyAdaptationWorkspace";
import UpdateLessonHomework from "@/components/pages/UpdateLessonHomework";
import AcademyManagerDashboard from "@/components/pages/AcademyManagerDashboard";
import GroupStatistics from "@/components/pages/LessonsStatistics/GroupStatistics";
import SingleGroupStatistics from "@/components/pages/LessonsStatistics/SingleGroupStatistics";
import LessonStatistics from "@/components/pages/LessonsStatistics/LessonStatistics";
import { USER_ROLES } from "@/constants";
import MentorSalary from "@/components/pages/MentorSalary";
import { Suspense } from "react";
import CreateMentor from "@/components/pages/CreateMentor";
import AppRateStatistics from "@/components/pages/AppRateStatistics";

const sellerAllowedMessagesTypes = [MessageTypes.COMMENT]

const callTecherRoutes = createBrowserRouter([
    {
        path: '/',
        element: (
            <MentorCardsProvider>

                <MainLayout sidebarLinks={callMentorSidebarLinks} />
            </MentorCardsProvider>
        ),
        children: [
            {
                path: '',
                element: <CallMentorDashboard />
            },
            {
                path: '/salary',
                element: <MentorSalary />
            },
            {
                path: '/students',
                element: (
                    <Suspense fallback={<Loader />}>
                        <MyStudents />
                    </Suspense>
                )
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
        element: (
            <MentorCardsProvider>
                <MainLayout sidebarLinks={mainMentorSidebarLinks} />
            </MentorCardsProvider>
        ),
        children: [
            {
                path: '',
                element: <MainMentorDashboard />
            },
            {
                path: '/salary',
                element: <MentorSalary />
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
                element: <GroupLessons />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId',
                element: <SingleLesson />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId/create-homework',
                element: <CreateLessonHomework />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId/hometask/:homeTaskId',
                element: <UpdateLessonHomework />
            },
            {
                path: '/lessons-schedule/:groupId/:lessonId/:homeWorkId',
                element: <HomeworkReview />
            },
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
                element: <AcademyManagerDashboard />
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
                path: '/main-teachers/:mentorId/salary',
                element: <MentorSalary />
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
                path: '/call-teachers/:mentorId/salary',
                element: <MentorSalary />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/:userId',
                element: <SingleUser />
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
                path: '/update-course/:courseId',
                element: <UpdateSingleStudentCourse />
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
                path: '/mentors/create-mentor',
                element: <CreateMentor />
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
                path: '/courses',
                element: <Courses />
            },
            {
                path: '/courses/:courseId',
                element: <UpdateCourse />
            },
            {
                path: '/statistics/lessons',
                element: <GroupStatistics />
            },
            {
                path: '/statistics/lessons/:mentorId/:groupId',
                element: <SingleGroupStatistics />
            },
            {
                path: '/statistics/lessons/:mentorId/:groupId/:lessonId',
                element: <LessonStatistics />
            },
            {
                path: '/statistics/app-rate',
                element: <AppRateStatistics />
            },
            {
                path: '/moderation/:courseId',
                element: <Moderation />
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
                path: '/adaptation',
                element: <AcademyAdaptationWorkspace />
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

    return (isUserLoading ? (
        <RouterProvider router={loadingRoute} />
    ) : (
        <RouterProvider router={isAuth ? getRoutesByRole(user?.role) : authRoutes} />
    ))
};

export default Routers;
