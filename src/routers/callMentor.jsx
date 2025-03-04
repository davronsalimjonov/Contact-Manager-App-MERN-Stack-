import { createBrowserRouter } from "react-router-dom"
import Chat from "@/components/pages/Chat"
import MainLayout from "@/components/templates/MainLayout"
import  MentorCardsProvider from "@/providers/MentorCardsProvider"
import CallMentorDashboard from "@/components/pages/CallMentorDashboard"
import MentorSalary from "@/components/pages/MentorSalary"
import MyStudents from "@/components/pages/MyStudents"
import SingleStudent from "@/components/pages/SingleStudent"
import UserCourseUpdate from "@/components/pages/UserCourseUpdate"
import Workspace from "@/components/pages/Workspace"
import Dictionary from "@/components/pages/Dictionary"
import AdaptationWorkspace from "@/components/pages/AdaptationWorkspace"
import Settings from "@/components/pages/Settings"
import MentorTasks from "@/components/pages/MentorTasks"
import PageNotFound from "@/components/pages/PageNotFound"
import { HouseIcon, MenuBookIcon, PersonsIcon, TaskIcon, TranslateIcon, WorkHistoryIcon } from "@/components/UI/atoms/icons"

const links = [
    {
        id: 0,
        link: '/',
        label: 'Dashboard',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '/students',
        label: 'O’quvchilarim',
        icon: PersonsIcon()
    },
    {
        id: 2,
        link: '/dictionary',
        label: 'Lug’at',
        icon: TranslateIcon()
    },
    {
        id: 4,
        link: '/workspace',
        label: 'Workspace',
        icon: MenuBookIcon()
    },
    {
        id: 5,
        link: '/tasks',
        label: 'Tasks',
        icon: TaskIcon()
    },
    {
        id: 6,
        link: '/adaptation-workspace',
        label: 'Adaptatsiya workspace',
        icon: WorkHistoryIcon()
    }
]

export const CallMentorRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: (
            <MentorCardsProvider>
                <MainLayout sidebarLinks={links} />
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
                element: <MyStudents />
            },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat />
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

export default CallMentorRoutes;