import MainLayout from "@/components/templates/MainLayout";
import MentorCardsProvider from "@/providers/MentorCardsProvider";
import MainMentorDashboard from "@/components/pages/MainMentorDashboard";
import MentorSalary from "@/components/pages/MentorSalary";
import Materials from "@/components/pages/Materials";
import MainMentorStudents from "@/components/pages/MainMentorStudents";
import SingleStudent from "@/components/pages/SingleStudent";
import UserCourseUpdate from "@/components/pages/UserCourseUpdate";
import Dictionary from "@/components/pages/Dictionary";
import LessonsSchedule from "@/components/pages/LessonsSchedule";
import GroupLessons from "@/components/pages/GroupLessons";
import SingleLesson from "@/components/pages/SingleLesson";
import CreateLessonHomework from "@/components/pages/CreateLessonHomework";
import UpdateLessonHomework from "@/components/pages/UpdateLessonHomework";
import HomeworkReview from "@/components/pages/HomeworkReview";
import CoursesIFrame from "@/components/pages/CoursesIFrame";
import Settings from "@/components/pages/Settings";
import PageNotFound from "@/components/pages/PageNotFound";
import { BooksMoviesAndMusicIcon, HouseIcon, ListIcon, PersonsGroupIcon, PersonsIcon, TranslateIcon } from "@/components/UI/atoms/icons";
import { createBrowserRouter } from "react-router-dom";
import Chat from "@/components/pages/Chat";
import AllStudents from "@/components/pages/AllStudents";
import RedirectToStudentSingle from "@/components/pages/RedirectToStudentSingle";

const links = [
    { id: 0, link: '/', label: 'Dashboard', icon: HouseIcon() },
    { id: 1, link: '/students', label: 'O’quvchilarim', icon: PersonsIcon() },
    { id: 2, link: '/dictionary', label: 'Lug’at', icon: TranslateIcon() },
    { id: 3, link: '/lessons-schedule', label: 'Dars jadvali', icon: ListIcon() },
    { id: 4, link: '/platform', label: 'Plaforma', icon: ListIcon() },
    { id: 5, link: '/materials', label: 'Materials', icon: BooksMoviesAndMusicIcon() },
    { id: 6, link: '/all-students', label: 'Barcha o\'quvchilar', icon: PersonsGroupIcon() },
]

const MainMentorRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: (
            <MentorCardsProvider>
                <MainLayout sidebarLinks={links} />
            </MentorCardsProvider>
        ),
        children: [
            { path: '', element: <MainMentorDashboard /> },
            { path: '/salary', element: <MentorSalary /> },
            { path: '/materials', element: <Materials /> },
            { path: '/all-students', element: <AllStudents /> },
            { path: '/all-students/:courseId/:userId', element: <RedirectToStudentSingle /> },
            { path: '/students', element: <MainMentorStudents /> },
            { path: '/students/chat/:userCourseId', element: <Chat /> },
            { path: '/students/:courseId/:userId', element: <SingleStudent /> },
            { path: '/user-course/:userCourseId', element: <UserCourseUpdate />},
            { path: '/dictionary', element: <Dictionary /> },
            { path: '/lessons-schedule', element: <LessonsSchedule /> },
            { path: '/lessons-schedule/:groupId', element: <GroupLessons /> },
            { path: '/lessons-schedule/:groupId/:lessonId', element: <SingleLesson /> },
            { path: '/lessons-schedule/:groupId/:lessonId/create-homework', element: <CreateLessonHomework /> },
            { path: '/lessons-schedule/:groupId/:lessonId/hometask/:homeTaskId', element: <UpdateLessonHomework /> },
            { path: '/homework/:homeWorkId', element: <HomeworkReview /> },
            { path: '/platform', element: <CoursesIFrame /> },
            { path: '/settings', element: <Settings /> },
            { path: '*', element: <PageNotFound /> },
        ]
    }
])

export default MainMentorRoutes;