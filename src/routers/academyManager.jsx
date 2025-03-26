import { createBrowserRouter } from "react-router-dom";
import AcademyAdaptationWorkspace from "@/components/pages/AcademyAdaptationWorkspace";
import AcademyManagerDashboard from "@/components/pages/AcademyManagerDashboard";
import AllMentors from "@/components/pages/AllMentors";
import AllStudents from "@/components/pages/AllStudents";
import AppRateStatistics from "@/components/pages/AppRateStatistics";
import CallMentorsStatistic from "@/components/pages/CallMentorsStatistic";
import CallMentorStatistic from "@/components/pages/CallMentorStatistic";
import Courses from "@/components/pages/Courses";
import CreateMentor from "@/components/pages/CreateMentor";
import Groups from "@/components/pages/Groups";
import LessonPlan from "@/components/pages/LessonPlan";
import GroupStatistics from "@/components/pages/LessonsStatistics/GroupStatistics";
import LessonStatistics from "@/components/pages/LessonsStatistics/LessonStatistics";
import SingleGroupStatistics from "@/components/pages/LessonsStatistics/SingleGroupStatistics";
import MainMentorStatistic from "@/components/pages/MainMentorStatistic";
import MentorSalary from "@/components/pages/MentorSalary";
import Moderation from "@/components/pages/Moderation";
import PageNotFound from "@/components/pages/PageNotFound";
import Settings from "@/components/pages/Settings";
import SingleGroup from "@/components/pages/SingleGroup";
import SingleMentor from "@/components/pages/SingleMentor";
import SingleStudent from "@/components/pages/SingleStudent";
import SingleUser from "@/components/pages/SingleUser";
import UpdateCourse from "@/components/pages/UpdateCourse";
import UpdateSingleStudentCourse from "@/components/pages/UpdateSingleStudentCourse";
import UserCourseUpdate from "@/components/pages/UserCourseUpdate";
import Users from "@/components/pages/Users";
import MainLayout from "@/components/templates/MainLayout";
import { AutoStoriesIcon, HouseIcon, LanIcon, PersonsIcon, SchoolIcon, WorkHistoryIcon } from "@/components/UI/atoms/icons";
import MainMentorsStatistic from "@/components/pages/MainMentorsStatistic";
import SingleSeller from "@/components/pages/SalesDirector/SingleSeller";
import Chat from "@/components/pages/Chat";
import FinishedAdaptations from "@/components/pages/FinishedAdaptations";

const links = [
    {
        id: 0,
        link: '/',
        label: 'Dashboard',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '',
        label: 'Mentorlar statistikasi',
        icon: SchoolIcon(),
        children: [
            {
                id: '1.1',
                label: 'Asosiy mentor',
                link: '/main-teachers'
            },
            {
                id: '1.2',
                label: 'Nazoratchi mentor',
                link: '/call-teachers'
            },
        ]
    },
    {
        id: 2,
        link: '',
        label: 'Foydalanuvchilar',
        icon: PersonsIcon(),
        children: [
            {
                id: '2.1',
                label: 'Foydalanuvchi',
                link: '/users'
            },
            {
                id: '2.2',
                label: 'O’quvchilarim',
                link: '/students'
            },
            {
                id: '2.3',
                label: 'Mentor',
                link: '/mentors'
            }
        ]
    },
    {
        id: 3,
        label: 'Servis statistikasi',
        link: '/service-statistics',
        icon: LanIcon(),
        children: [
            {
                id: '4.1',
                label: 'Dars bo\'yicha statistika',
                link: '/statistics/lessons'
            },
            {
                id: '4.2',
                label: 'Call bo\'yicha statistika',
                link: '/statistics/call'
            },
            {
                id: '4.3',
                label: 'Ilova bahosi',
                link: '/statistics/app-rate'
            },
            {
                id: '4.4',
                label: 'Mentorlar bahosi',
                link: '/statistics/mentors-rate'
            }
        ]
    },
    {
        id: 4,
        label: 'Kurslar',
        link: '/courses',
        icon: AutoStoriesIcon()
    },
    {
        id: 5,
        label: 'Guruhlar',
        link: '/groups',
        icon: PersonsIcon()
    },
    {
        id: 6,
        label: 'Adaptatsiya',
        link: '/adaptation',
        icon: WorkHistoryIcon()
    }
]

const AcademyManagerRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            {
                path: '/',
                element: <AcademyManagerDashboard />
            },
            {
                path: '/main-teachers',
                element: <MainMentorsStatistic />
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
                element: <CallMentorsStatistic />
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
                element: <AllStudents navigateToChat />
            },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat allowedMessagesTypes={[]} disableTaskAttachment />
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
                path: '/adaptation/finished',
                element: <FinishedAdaptations />
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

export default AcademyManagerRoutes;