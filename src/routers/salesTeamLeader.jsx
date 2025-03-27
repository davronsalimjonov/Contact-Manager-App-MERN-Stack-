import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import SellersDashboard from "@/components/pages/SellersDashboard";
import Employees from "@/components/pages/SalesTeamLeader/Employees";
import { HouseIcon, LeaderboardIcon, PersonsGroupIcon, PersonsIcon } from "@/components/UI/atoms/icons";
import SingleSeller from "@/components/pages/SalesDirector/SingleSeller";
import Students from "@/components/pages/SalesTeamLeader/Students";
import SinglePageLayout from "@/components/templates/SinglePageLayout";
import SalesForm from "@/components/pages/SalesForm";
import { MessageTypes } from "@/constants/enum";
import Chat from "@/components/pages/Chat";

const links = [
    { id: 0, link: '/', label: 'Home', icon: HouseIcon() },
    { id: 1, link: '/dashboard', label: 'Dashboard', icon: LeaderboardIcon() },
    { id: 2, link: '/students', label: 'O’quvchilarim', icon: PersonsIcon() },
    { id: 3, link: '/employees', label: 'Xodimlar', icon: PersonsGroupIcon() }
]

const SalesTeamLeaderRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            { path: '', element: <SellersDashboard /> },
            { path: '/students', element: <Students /> },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat allowedMessagesTypes={[MessageTypes.COMMENT]} />
            },
            { path: '/employees', element: <Employees /> },
            { path: '/employees/:sellerId', element: <SingleSeller /> },
            { path: '*', element: <PageNotFound /> }
        ]
    },
    {
        path: '',
        element: <SinglePageLayout />,
        children: [
            { path: '/sales-form', element: <SalesForm /> },
        ]
    },
])

export default SalesTeamLeaderRoutes